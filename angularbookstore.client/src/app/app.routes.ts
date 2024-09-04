import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { BookFormComponent } from './pages/book-form/book-form.component';


export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"home", component:HomeComponent},
    {path:"quote", component:QuoteComponent},
    { path: 'book-form', component: BookFormComponent }, 
    { path: 'book-form/:id', component: BookFormComponent }, 

];

