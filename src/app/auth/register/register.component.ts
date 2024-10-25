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
    // Inicializar el formulario
    this.formRegister = this.formBuilder.group({
      document: ['1100000777', [Validators.required, Validators.minLength(6)]],
      name: ['Honorius', [Validators.required]],
      lastname: ['diGesus', [Validators.required]],
      email: ['aswedfs0@mail.com', [Validators.required, Validators.email]],
      password: ['Salo1207*12', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['Salo1207*12', [Validators.required, Validators.minLength(6)]]
    });
  }


  registerUser() {

    const passwordHash = this.formRegister.get('password')?.value;
    const confirmPassword = this.formRegister.get('confirm_password')?.value;
    this.passwordMatchValidator(passwordHash, confirmPassword);

    if (this.formRegister.valid) {
      // Mapear los campos del formulario a LoginRequest
      const userRequest: UserRequest = {
        identityDocument: this.formRegister.get('document')?.value || '',
        fullName: this.formRegister.get('name')?.value || '',
        lastName: this.formRegister.get('lastname')?.value || '',
        email: this.formRegister.get('email')?.value || '',
        passwordHash: this.formRegister.get('password')?.value || ''
      };

      console.log('LoginRequest mapeado:', userRequest);
      this.userService.registerUser(userRequest)
        .subscribe({
          next:() => {
            this.showMessage('Success', 'Usuario registrado, ahora puede iniciar sesión', 'success');
            this.router.navigate(['/auth/login'])
          },
          error:(message)=>{
            this.showMessage('Error', 'No se pudo registrar el usuario, por favor verifique su información', 'error');
            console.error({RegisterError: 'Failed to register', message})
          }
        })
    } else {
      this.showMessage('Error', 'Formulario inválido, por favor verifique su información', 'error');
      console.log('Formulario inválido');
    }
  }

  passwordMatchValidator(passwordHash: string, confirmPassword: string): void{
    // 6-20 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;

    if (!passwordRegex.test(passwordHash)) {
      this.formRegister.get('password')?.setErrors({ invalidPassword: true });
    } else {
      this.formRegister.get('password')?.setErrors(null);
    }

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
