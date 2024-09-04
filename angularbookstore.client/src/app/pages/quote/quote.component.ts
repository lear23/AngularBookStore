// import { Component, OnInit, inject } from '@angular/core';
// import { QuoteService } from '../../Services/quote.service';
// import { Quote } from '../../interfaces/Quote';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-quote',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './quote.component.html',
//   styleUrls: ['./quote.component.css']  
// })
// export class QuoteComponent implements OnInit {
//   private quoteService = inject(QuoteService);
//   public quotes: Quote[] = [];

//   ngOnInit(): void {
//     this.loadQuotes();
//   }

//   loadQuotes(): void {
//     this.quoteService.getQuotes().subscribe({
//       next: (data: Quote[]) => {
//         this.quotes = data;
//       },
//       error: (error: any) => {
//         console.error("Error loading quotes", error);
//       }
//     });
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { Quote } from '../../interfaces/Quote';
import { Client } from '../../interfaces/Client'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AccessService } from '../../Services/access.service';
import { QuoteService } from '../../Services/quote.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']  
})
export class QuoteComponent implements OnInit {
  private quoteService = inject(QuoteService);
  private accessService = inject(AccessService);

  public quotes: Quote[] = [];
  public newQuote: Quote = { id: '', text: '', author: '', clientId: '' };
  public clients: Client[] = []; 

  ngOnInit(): void {
    this.loadQuotes();
    this.loadClients(); 
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (data: Quote[]) => {
        this.quotes = data;
      },
      error: (error: any) => {
        console.error("Error loading quotes", error);
      }
    });
  }

  loadClients(): void {
    this.accessService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      },
      error: (error: any) => {
        console.error("Error loading clients", error);
      }
    });
  }

  addQuote(): void {
    if (!this.newQuote.text || !this.newQuote.author) {
        console.error("Text and Author are required");
        alert("Please fill in all required fields.");
        return;
    }

    this.quoteService.addQuote(this.newQuote).subscribe({
        next: () => {
            console.log("Quote added successfully");
            this.loadQuotes();
            this.newQuote = { id: '', text: '', author: '' }; 
        },
        error: (error: any) => {
            console.error("Error adding quote", error);
            alert("Error adding quote: " + (error.error || error.message || "Unknown error"));
        }
    });
}


  deleteQuote(id: string): void {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.loadQuotes(); 
      },
      error: (error: any) => {
        console.error("Error deleting quote", error);
      }
    });
  }
}
