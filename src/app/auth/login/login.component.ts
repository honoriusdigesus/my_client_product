import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import Swal, {SweetAlertIcon} from 'sweetalert2'


@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(LoginService);
  private router = inject(Router);

  constructor() {
  }

  public loginForm = this.formBuilder.group({
    email:    ['hou1saashqws@mail.com', [Validators.required, Validators.email]],
    password: ['Salo1207*', [Validators.required, Validators.minLength(8)]]
  });

  login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.authService.login(email, password)
      .subscribe({
        next: ()=> {
          this.showMessage('Success', 'You are now logged in', 'success');
          console.log('Logged in!')
          this.router.navigate(['/dashboard']);
        },
        error: (err)=> {
          this.showMessage('Error', err, 'error');
          console.error({LoginError: 'Failed to login', err})
        }
        }
      );
  }

  // Ejemplo de notificación de error
  showMessage(title:string,errorMessage: string, myIcon:SweetAlertIcon) {
    Swal.fire({
      title:title,
      text: errorMessage,
      icon: myIcon,
      confirmButtonText: 'Cool'
    })
  }

}
