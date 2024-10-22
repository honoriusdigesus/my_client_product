import {Component, computed, effect, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LoginService} from './auth/services/login.service';
import {AuthStatus} from './auth/interfaces/auth-status.enum';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);


  public finishedAuthCheck = computed<boolean>( ()=>{
    if (this.loginService.authStatus() == AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(()=>{
      switch (this.loginService.authStatus()) {
        case AuthStatus.authenticated:
          console.log('User is authenticated');
          this.router.navigateByUrl('/dashboard');
          break;
        case AuthStatus.unauthenticated:
          console.log('User is not authenticated');
          this.router.navigateByUrl('/auth/login');
          break;
      }
  })

  constructor() {
  }
}
