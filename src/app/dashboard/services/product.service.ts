import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {ProductResponse} from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

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
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/Api/Product/All`, {headers})
      .pipe(
        tap(() => console.log('Products fetched')),
        catchError(err => throwError(() => err.error.message)
        ));
  }

  //Delete product by name
  deleteProduct(productName: string): Observable<ProductResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<ProductResponse>(`${this.baseUrl}/Api/Product/Delete/${productName}`, {headers})
      .pipe(
        tap(() => console.log('Product deleted:', productName)),
        catchError(err => throwError(() => err.error.message)
        ));
  }

  constructor() {
  }

}
