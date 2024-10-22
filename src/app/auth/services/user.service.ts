import {inject, Injectable} from '@angular/core';
import {UserResponse} from '../interfaces/user-response.interface';
import {UserRequest} from '../interfaces/user-request.interface';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  registerUser(user: UserRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.baseUrl}/Api/User/Create`, user);
  }

  constructor() { }
}
