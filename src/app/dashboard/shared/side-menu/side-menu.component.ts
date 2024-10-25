import {Component, computed, inject} from '@angular/core';
import {routes} from '../../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../../auth/services/login.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {


  private loginService = inject(LoginService);
  public user = computed(() => this.loginService.currentUser());
  public menuItems = routes.map((route)=>route.children ?? [])
    .flat()
    .filter((route)=>!route.path?.includes('**'))
    .filter((route)=>!route.path?.includes(':DI'))
    .filter((route)=>!route.path?.includes('update'));

  onLogout(){
    this.loginService.logout();
  }

}
