
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { Book } from '../../interfaces/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  isEditMode: boolean = false;
  bookId?: string;
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: [''],
      description: ['', [Validators.required]],
      publicationDate: [''], 
      imageFile: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => {
        this.bookId = params['id'];
        this.isEditMode = !!this.bookId;
      }),
      switchMap(() => {
        if (this.isEditMode) {
          return this.bookService.getBookById(this.bookId!);
        }
        return [];
      })
    ).subscribe(book => {
      if (book) {
        this.bookForm.patchValue({
          ...book,
          publicationDate: book.publicationDate ? book.publicationDate.substring(0, 10) : ''
        });
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      const imageFile = this.selectedFile;

      if (bookData.publicationDate) {
        const date = new Date(bookData.publicationDate);
        bookData.publicationDate = date.toISOString().substring(0, 10); 
      }

      if (this.isEditMode) {
        this.bookService.updateBook(this.bookId!, bookData).subscribe({
          next: (response) => {
            console.log('Book updated:', response);
            this.router.navigate(['/home']);
            alert('Book updated successfully!');
          },
          error: (error) => {
            console.error('Error updating book:', error);
            alert('Failed to update book. Please try again.');
          }
        });
      } else {
        this.bookService.addBook(bookData, imageFile).subscribe({
          next: (response) => {
            console.log('Book created:', response);
            this.bookForm.reset();
            this.router.navigate(['/home']);
            alert('Book created successfully!');
          },
          error: (error) => {
            console.error('Error creating book:', error);
            alert('Failed to create book. Please try again.');
          }
        });
      }
    } else {
      console.error('Form is invalid');
      alert('Please fill out all required fields.');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnDestroy(): void {}
}

