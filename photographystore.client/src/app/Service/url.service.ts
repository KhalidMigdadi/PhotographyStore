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

  constructor(private _url: HttpClient) { }


  getproducts() {

    return this._url.get<any>("https://67ddf63c471aaaa74282f2a0.mockapi.io/product")

  constructor(private _url: HttpClient) { }

  getUsers() {
    return this._url.get("https://67cea6ee125cd5af757b6514.mockapi.io/Users");
  }
  getCategory() {
    return this._url.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories");
  }
  getProduct() {
    return this._url.get("https://67ddf63c471aaaa74282f2a0.mockapi.io/product");
  }
  getCategoryByID(id: any) {
    return this._url.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`)
  }
  getProductByID(id: any) {
    return this._url.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`)
  }
  getUserByID(id: any) {
    return this._url.get(`https://67cea6ee125cd5af757b6514.mockapi.io/Users/${id}`);
  }
  addReview(review: any) {
    return this._url.post("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews", review);
  }
  getReviews() {
    return this._url.get("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews");
  }
  getReviewsByProductId(productId: string) {
    return this._url.get(`https://67d3051b8bca322cc268e4dc.mockapi.io/reviews?productId=${productId}`);
  }
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
