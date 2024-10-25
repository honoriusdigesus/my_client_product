import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {User} from '../interfaces/user';
import {AuthStatus} from '../interfaces/auth-status.enum';
import {LoginResponse} from '../interfaces/login-response';
import {CheckTokenResponse} from '../interfaces/check-token.response.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal<User | null>(null);
  public currentUser = computed(() => this._currentUser());

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkLoginStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/Api/Login/Auth`;
    const body = {email, password};
    return this.http.post<LoginResponse>(url, body)
      .pipe(tap(({user, token}) => {
        this.setLoginAuthenticated(user, token);
        console.log('[Line 36 Login]Logged in as', user, 'with token', token);
      }), map(() => true), catchError(err => throwError(() => err.error.message)));
  }

  checkLoginStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/Api/Login/ValidateToken`;
    const token = localStorage.getItem('token');

    if (!token) {
      this._authStatus.set(AuthStatus.unauthenticated);
      return of(false);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.post<CheckTokenResponse>(url, {}, {headers})
      .pipe(map((userResponse) => {
        this.setLoginAuthenticated(userResponse, token);
        return true
      }), catchError(() => {
        this._authStatus.set(AuthStatus.unauthenticated);
        return of(false);
      }))
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
  }

  private setLoginAuthenticated(user: User, token: string): Boolean {
    localStorage.setItem('token', token);
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    console.log('[Line 70 Login]Logged in as', user, 'with token', token);
    return true;
  }

}
