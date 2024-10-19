import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

}
