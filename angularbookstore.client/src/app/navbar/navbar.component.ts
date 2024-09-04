
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { AccessService } from '../Services/access.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDarkMode = false;
  menuOpen = false;

  private accessService = inject(AccessService);
  private router = inject(Router);

  onThemeToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isDarkMode = input.checked;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signOut() {
    this.accessService.signOut().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          alert('Sign-out failed.');
        }
      },
      error: (error) => {
        console.error('Error during sign-out', error);
        alert('An error occurred during sign-out. Please try again.');
      }
    });
  }
}
