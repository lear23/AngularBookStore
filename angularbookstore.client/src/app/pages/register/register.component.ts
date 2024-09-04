import { Component, inject } from '@angular/core';
import { AccessService } from '../../Services/access.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../interfaces/Client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  register(): void {
    if (this.formRegister.invalid) return;

    const clientData: Client = {
      firstName: this.formRegister.value.firstName,
      lastName: this.formRegister.value.lastName,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
    };

    this.accessService.register(clientData).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          localStorage.setItem("token", data.token || '');
          this.router.navigate([""]);
        } else {
          alert("Registration failed.");
        }
      },
      error: (error) => {
        console.error("Registration error", error.message);
      }
    });
  }

  goBack(): void {
    this.router.navigate([""]);
  }
}


