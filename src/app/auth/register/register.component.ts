import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserRequest} from '../interfaces/user-request.interface';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);


  formRegister: FormGroup;

  constructor() {
    this.formRegister = this.formBuilder.group({
      document: ['1104000001', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['Nombre', [Validators.required]],
      lastname: ['Apellido', [Validators.required]],
      email: ['micorreo@gmail.com', [Validators.required, Validators.email]],
      password: ['Salo1207*', [Validators.required]],
      confirm_password: ['Salo1207*', [Validators.required]]
    });
  }


  registerUser() {
    const passwordHash = this.formRegister.get('password')?.value;
    const confirmPassword = this.formRegister.get('confirm_password')?.value;
    this.passwordMatchValidator(passwordHash, confirmPassword);

    if (this.formRegister.valid) {
      // Mapear los campos del formulario a UserRequest
      const userRequest: UserRequest = {
        identityDocument: this.formRegister.get('document')?.value || '',
        fullName: this.formRegister.get('name')?.value || '',
        lastName: this.formRegister.get('lastname')?.value || '',
        email: this.formRegister.get('email')?.value || '',
        passwordHash: this.formRegister.get('password')?.value || ''
      };

      console.log('UserRequest mapeado:', userRequest);

      // Enviar el objeto al servidor
      this.userService.registerUser(userRequest)
        .subscribe({
          next: () => {
            this.showMessage('Success', 'Usuario registrado, ahora puede iniciar sesión', 'success');
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.showMessage('Error', 'No se pudo registrar el usuario, por favor verifique su información', 'error');
            console.error('RegisterError:', error);
          }
        });
    } else {
      this.showMessage('Error', 'Formulario inválido, por favor verifique su información', 'error');
      console.log('Formulario inválido:', {error: this.formRegister.errors});
    }
  }

  passwordMatchValidator(passwordHash: string, confirmPassword: string): void {
    // Validar la coincidencia de las contraseñas
    if (passwordHash !== confirmPassword) {
      this.formRegister.get('confirm_password')?.setErrors({ notEqual: true });
    } else {
      this.formRegister.get('confirm_password')?.setErrors(null);
    }
  }


  private showMessage(title: string, message: string, success: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: message,
      icon: success,
      timer: 3500
    });
  }
}
