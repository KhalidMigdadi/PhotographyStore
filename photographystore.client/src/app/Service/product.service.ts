import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';

  constructor(private http: HttpClient) { }

  // جلب المنتجات من الـ API
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
