import {inject, Injectable} from '@angular/core';
import {UserResponse} from '../interfaces/user-response.interface';
import {UserRequest} from '../interfaces/user-request.interface';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {
  }

  registerUser(user: UserRequest): Observable<UserResponse> {
    console.log('User to register in UserService:', user);
    return this.http.post<UserResponse>('http://localhost:29585/Api/User/Create', user)
      .pipe(
        tap(() => console.log('User registered', user)),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
