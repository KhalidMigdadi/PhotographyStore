import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) { }
  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();


  getUsers(): Observable<any> {
    return this.http.get<any>("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers");
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers", user);
  }
 
  //setUserId(id: string) {
  //  this.userIdSubject.next(id); // ✅ NO localStorage
  //}

  //getUserId(): string | null {
  //  return this.userIdSubject.value;
  //}




  // دالة لتحديث userId في BehaviorSubject
  setUserId(userId: string) {
    this.userIdSubject.next(userId);  // تحديث الـ userId
  }

  // دالة للحصول على userId الحالي
  getUserId(): string | null {
    return this.userIdSubject.value;  // إرجاع القيمة الحالية للـ userId
  }



  logout() {
    this.userIdSubject.next(null);
  }



  ////////////orders/////////
  private orderApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order';
  private orderItemApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item';
  private productApi = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';
  getOrders() {
    return this.http.get<any[]>(this.orderApi);
  }

  getOrderItems() {
    return this.http.get<any[]>(this.orderItemApi);
  }

  getProducts() {
    return this.http.get<any[]>(this.productApi);
  }
  ////////////////////////////////////////////////
  private apiUrl = 'https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers';

  getUserById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }



 

}
