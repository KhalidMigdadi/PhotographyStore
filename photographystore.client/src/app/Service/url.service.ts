//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class UrlService {

//  private apiUrlFavorites = 'https://67e3d3032ae442db76d1c116.mockapi.io/favorite';
//  private apiUrlProducts = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product'; // استبدل برابط المنتجات


//  constructor(private _url: HttpClient) { }

//  ///////////////////////
//  // ✅ Auth / Users
//  ///////////////////////

//  private apiUrl = 'https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers';
//  private userIdSubject = new BehaviorSubject<string | null>(null);
//  userId$ = this.userIdSubject.asObservable();

//  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//  isLoggedIn$ = this.isLoggedInSubject.asObservable();

//  setUserId(id: string) {
//    this.userIdSubject.next(id);
//    this.setLoginStatus(true); // ✅ Auto-login
//  getUsers(): Observable<any> {
//    return this._url.get<any>("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers");
//  }

//  addUser(user: any): Observable<any> {
//    return this._url.post<any>("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers", user);
//  }

//  //setUserId(id: string) {
//  //  this.userIdSubject.next(id); // ✅ NO localStorage
//  //}

//  //getUserId(): string | null {
//  //  return this.userIdSubject.value;
//  //}




//  // دالة لتحديث userId في BehaviorSubject
//  setUserId(userId: string) {
//    this.userIdSubject.next(userId);  // تحديث الـ userId
//  }

//  // دالة للحصول على userId الحالي
//  getUserId(): string | null {
//    return this.userIdSubject.value;  // إرجاع القيمة الحالية للـ userId
//  }

//  //constructor(private _url: HttpClient) { }


//  getproducts() {

//    return this._url.get<any>("https://67ddf63c471aaaa74282f2a0.mockapi.io/product")
//  }


//  //constructor(private _url: HttpClient) { }

//  //getUsers() {
//  //  return this._url.get("https://67cea6ee125cd5af757b6514.mockapi.io/Users");
//  //}



//  getCategory() {
//    return this._url.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories");
//  }
//  getProduct() {
//    return this._url.get("https://67ddf63c471aaaa74282f2a0.mockapi.io/product");
//  }
//  getCategoryByID(id: any) {
//    return this._url.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`)
//  }
//  getProductByID(id: any) {
//    return this._url.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`)
//  }
//  getUserByID(id: any) {
//    return this._url.get(`https://67cea6ee125cd5af757b6514.mockapi.io/Users/${id}`);
//  }
//  addReview(review: any) {
//    return this._url.post("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews", review);
//  }
//  getReviews() {
//    return this._url.get("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews");
//  }
//  getReviewsByProductId(productId: string) {
//    return this._url.get(`https://67d3051b8bca322cc268e4dc.mockapi.io/reviews?productId=${productId}`);
//  }



//  // جلب الـ userId من API
//  getUserIdFromAPI(): Observable<string> {
//    return this._url.get<string>("https://your-api-url.com/user-id");  // استبدل بـ API الفعلي
//  }

//  Addproducts(data: any) {

//    return this._url.post<any>("https://67e3f94f2ae442db76d26687.mockapi.io/cartItem", data)
//  }

//  // ✅ جلب قائمة المفضلة
//  getFavorites() {
//    return this._url.get<any[]>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite");
//  }

//  addToFavorite(item: any): Observable<any> {
//    return this._url.post<any>(this.apiUrlFavorites, item);
//  }


//  ShowF() {
//    return this._url.get<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite")


//  }

//  DeleteF(id: any) {

//    return this._url.delete<any>(`https://67e3d3032ae442db76d1c116.mockapi.io/favorite/${id}`)
//  }

//  setLoginStatus(status: boolean) {
//    this.isLoggedInSubject.next(status);
//  }


//  logout() {
//    this.userIdSubject.next(null);
//    this.isLoggedInSubject.next(false);
//  }



//  ////////////orders/////////
//  private orderApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order';
//  private orderItemApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item';
//  private productApi = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';
//  getOrders() {
//    return this._url.get<any[]>(this.orderApi);
//  getUsers(): Observable<any> {
//    return this.http.get<any[]>(this.apiUrl);
//  }

//  getOrderItems() {
//    return this._url.get<any[]>(this.orderItemApi);
//  }

//  getProducts() {
//    return this._url.get<any[]>(this.productApi);
//  addUser(user: any): Observable<any> {
//    return this.http.post<any>(this.apiUrl, user);
//  }

//  getUserById(id: string) {
//    return this._url.get<any>(`${this.apiUrl}/${id}`);
//  getUserById(id: string): Observable<any> {
//    return this.http.get<any>(`${this.apiUrl}/${id}`);
//  }

//  updateUser(id: string, data: any) {
//    return this._url.put<any>(`${this.apiUrl}/${id}`, data);
//  updateUser(id: string, data: any): Observable<any> {
//    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
//  }

//  ///////////////////////
//  // ✅ Orders / Products
//  ///////////////////////

//  private orderApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order';
//  private orderItemApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item';
//  private productApi = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';


//  getOrders(): Observable<any[]> {
//    return this._url.get<any[]>(this.orderApi);
//  }

//  getOrderItems(): Observable<any[]> {
//    return this._url.get<any[]>(this.orderItemApi);
//  }

//  getProducts(): Observable<any[]> {
//    return this._url.get<any[]>(this.productApi);
//  }
//}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private apiUrlFavorites = 'https://67e3d3032ae442db76d1c116.mockapi.io/favorite';
  private apiUrlProducts = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product'; // استبدل برابط المنتجات
  private apiUrl = 'https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers';
  private orderApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order';
  private orderItemApi = 'https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item';
  private productApi = 'https://67ddf63c471aaaa74282f2a0.mockapi.io/product';

  // Observable & BehaviorSubject
  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();


 
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private _url: HttpClient) { }


  getCartDetails(): Observable<any> {
    return this._url.get<any>(this.apiUrl);
  }


  ///////////////////////
  // ✅ Auth / Users
  ///////////////////////
  setUserId(id: string) {
    this.userIdSubject.next(id);
    this.setLoginStatus(true); // ✅ Auto-login
  }

  //setCartId(id: string) {
  //  this.cartIdSubject.next(id);
  //}


  getUsers(): Observable<any> {
    return this._url.get<any>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this._url.post<any>(this.apiUrl, user);
  }

  getUserById(id: string): Observable<any> {
    return this._url.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this._url.put<any>(`${this.apiUrl}/${id}`, data);
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

  ///////////////////////
  // ✅ Products / Categories
  ///////////////////////
  getCategory(): Observable<any> {
    return this._url.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories");
  }

  private cartIdSubject = new BehaviorSubject<string | null>(null);
  CartId = this.cartIdSubject.asObservable();


  

  addCart(data: any): Observable<any> {
    this.userId$.subscribe(s => {
      data.userId = s;
    }) 
    return this._url.post("https://67e3f94f2ae442db76d26687.mockapi.io/cart", data).pipe(
      tap((response: any) => {
        const cartId = response.id;  // استخراج الـ ID من الاستجابة
        this.cartIdSubject.next(cartId)
        console.log('Created cart ID:', cartId);  // طباعة الـ cartId
      })
    );
  }


  getProduct(): Observable<any> {
    return this._url.get(this.apiUrlProducts);
  }

  getCategoryByID(id: any): Observable<any> {
    return this._url.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`);
  }

  getProductByID(id: any): Observable<any> {
    return this._url.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`);
  }

  ShowF() {
    return this._url.get<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite")

  }

    DeleteF(id: any) {

      return this._url.delete<any>(`https://67e3d3032ae442db76d1c116.mockapi.io/favorite/${id}`)
    }

  ///////////////////////
  // ✅ Reviews
  ///////////////////////
  addReview(review: any): Observable<any> {
    return this._url.post("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews", review);
  }

  getReviews(): Observable<any> {
    return this._url.get("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews");
  }

  getReviewsByProductId(productId: string): Observable<any> {
    return this._url.get(`https://67d3051b8bca322cc268e4dc.mockapi.io/reviews?productId=${productId}`);
  }

  ///////////////////////
  // ✅ Favorites
  ///////////////////////
  getFavorites(): Observable<any[]> {
    return this._url.get<any[]>(this.apiUrlFavorites);
  }

  addToFavorite(item: any): Observable<any> {
    return this._url.post<any>(this.apiUrlFavorites, item);
  }

  deleteFavorite(id: any): Observable<any> {
    return this._url.delete<any>(`${this.apiUrlFavorites}/${id}`);
  }

  ///////////////////////
  // ✅ Orders
  ///////////////////////
  getOrders(): Observable<any[]> {
    return this._url.get<any[]>(this.orderApi);
  }

  getOrderItems(): Observable<any[]> {
    return this._url.get<any[]>(this.orderItemApi);
  }

  getProducts(): Observable<any[]> {
    return this._url.get<any[]>(this.productApi);
  }

  ///////////////////////
  // ✅ Cart
  ///////////////////////
  addProductsToCart(data: any): Observable<any> {
    return this._url.post<any>("https://67e3f94f2ae442db76d26687.mockapi.io/cartItem", data);
  }


  getCartId(): string | null {
    return this.cartIdSubject.value; // إرجاع قيمة cartId المحفوظة
  }


}
