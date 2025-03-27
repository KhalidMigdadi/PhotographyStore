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
 
  setUserId(id: string) {
    this.userIdSubject.next(id); // ✅ NO localStorage
  }

  getUserId(): string | null {
    return this.userIdSubject.value;
  }

  constructor(private _url: HttpClient) { }


  getproducts() {

    return this._url.get<any>("https://67ddf63c471aaaa74282f2a0.mockapi.io/product")

  }


  Addproducts(data:any) {

    return this._url.post<any>("https://67e3f94f2ae442db76d26687.mockapi.io/cartItem",data)
  }


  Addfavorite(favorite: any) {


    return this._url.post<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite", favorite)
  }

  ShowF() {
    return this._url.get<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite")


  }

  DeleteF(id: any ) {

    return this._url.delete<any>(`https://67e3d3032ae442db76d1c116.mockapi.io/favorite/${id}` )
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
