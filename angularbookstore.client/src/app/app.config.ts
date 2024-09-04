import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers:[
    provideRouter(routes),  
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  
  ]
};




