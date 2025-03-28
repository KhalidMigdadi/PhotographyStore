import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/category';
  private productUrl = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl);
  }


}
