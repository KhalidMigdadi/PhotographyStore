import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) { }

  ///////////////////////
  // ✅ Auth / Users
  ///////////////////////

  private apiUrl = 'https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers';
  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setUserId(id: string) {
    this.userIdSubject.next(id);
    this.setLoginStatus(true); // ✅ Auto-login
  }

  getUserId(): string | null {
    return this.userIdSubject.value;
  }

  setLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  logout() {
    this.userIdSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getUsers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  ///////////////////////
  // ✅ Orders / Products
  ///////////////////////

  private orderApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order';
  private orderItemApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item';
  private productApi = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.orderApi);
  }

  getOrderItems(): Observable<any[]> {
    return this.http.get<any[]>(this.orderItemApi);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApi);
  }
}
