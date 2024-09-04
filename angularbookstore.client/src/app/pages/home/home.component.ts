
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { BookService } from '../../Services/book.service';
import { Book } from '../../interfaces/Book';
import { ResponseBook } from '../../interfaces/ResponseBook';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router); 
  public books: Book[] = [];
  public selectedBook?: Book;

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.list().subscribe({
      next: (response: ResponseBook) => {
        console.log('Response received:', response);
        this.books = response.value;
        console.log('Books loaded:', this.books);
      },
      error: (error: any) => {
        console.error('Error loading books', error);
      }
    });
  }

  getBookById(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (book: Book) => {
        this.selectedBook = book;
      },
      error: (error: any) => {
        console.error('Error loading book by ID', error);
      }
    });
  }

  addBook(newBook: Book): void {
    this.bookService.addBook(newBook).subscribe({
      next: (book: Book) => {
        console.log('Book added', book);
        this.loadBooks();
      },
      error: (error: any) => {
        console.error('Error adding book', error);
      }
    });
  }

  updateBook(id: string, updatedBook: Book): void {
    this.bookService.updateBook(id, updatedBook).subscribe({
      next: (book: Book) => {
        console.log('Book updated', book);
        this.loadBooks();
      },
      error: (error: any) => {
        console.error('Error updating book', error);
      }
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        console.log('Book deleted');
        this.loadBooks(); 
      },
      error: (error: any) => {
        console.error('Error deleting book', error);
      }
    });
  }

  navigateToEdit(bookId: string): void {
    this.router.navigate([`/book-form/${bookId}`]);
  }
}

