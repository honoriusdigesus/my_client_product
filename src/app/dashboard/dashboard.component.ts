import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideMenuComponent} from './shared/side-menu/side-menu.component';
import {SearchBoxComponent} from './shared/search-box/search-box.component';

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
