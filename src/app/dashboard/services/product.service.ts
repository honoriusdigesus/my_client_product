import {inject, Injectable, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {ProductResponse} from '../interfaces/product.interface';
import {AuthStatus} from '../../auth/interfaces/auth-status.enum';
import {LoginService} from '../../auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private loginservice = inject(LoginService);

  searchProduct(productName: string): Observable<ProductResponse> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductResponse>(`${this.baseUrl}/Api/Product/Get/${productName}`, {headers});
  }

  getAllProducts(): Observable<ProductResponse[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/Api/Product/All`, {headers});
  }

  //Delete product by name
  deleteProduct(productName: string): Observable<ProductResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<ProductResponse>(`${this.baseUrl}/Api/Product/Delete/${productName}`, {headers});
  }

  constructor() {
  }

}
