import { Component, inject } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SideMenuComponent} from './shared/side-menu/side-menu.component';
import {SearchBoxComponent} from './shared/search-box/search-box.component';
import { LoginService } from '../auth/services/login.service';
import {AuthStatus} from '../auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    SideMenuComponent,
    SearchBoxComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
