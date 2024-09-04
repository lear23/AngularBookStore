// import { Component, inject } from '@angular/core';
// import { AccessService } from '../../Services/access.service';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Login } from '../../interfaces/Login';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private accessService = inject(AccessService);
//   private router = inject(Router);
//   public formBuild = inject(FormBuilder);

//   public formLogin: FormGroup = this.formBuild.group({
//     email: ["", Validators.required],
//     password: ["", Validators.required],
//   });

//   startSession() {
//     if (this.formLogin.invalid) return;

//     const object: Login = {
//       email: this.formLogin.value.email,
//       password: this.formLogin.value.password
//     };

//     this.accessService.login(object).subscribe({
//       next: (data) => {
//         if (data.isSuccess) {
//           localStorage.setItem("token", data.token);
//           this.router.navigate(["/home"]);
//         } else {
//           alert("Authentication failed: Incorrect email or password.");
//         }
//       },
//       error: (error) => {
//         console.error('Error during login', error);
//       }
//     });
//   }

//   register() {
//     this.router.navigate(["/register"]);
//   }
// }


import { Component, inject } from '@angular/core';
import { AccessService } from '../../Services/access.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  startSession() {
    if (this.formLogin.invalid) return;

    const object: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this.accessService.login(object).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          localStorage.setItem("token", data.token);
          this.router.navigate(["/home"]);
        } else {
          alert("Authentication failed: Incorrect email or password.");
        }
      },
      error: (error) => {
        console.error('Error during login', error);
      }
    });
  }

  register() {
    this.router.navigate(["/register"]);
  }
}
