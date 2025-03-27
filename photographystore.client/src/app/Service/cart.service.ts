//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class CartService {
//  private apiUrl = 'https://67e3f94f2ae442db76d26687.mockapi.io/cartItem';

//  constructor(private http: HttpClient) { }


//  private cartItems = new BehaviorSubject<any[]>([]);
//  cartItems$ = this.cartItems.asObservable();


//  getCartItems(): Observable<any[]> {
//    return this.http.get<any[]>(this.apiUrl);
//  }

//  addToCart(item: any) {
//    let currentCart = this.cartItems.value;
//    let existingItem = currentCart.find(cartItem => cartItem.id === item.id);

//    if (existingItem) {
//      existingItem.quantity += 1; // إذا كان المنتج موجودًا، زِد الكمية
//    } else {
//      item.quantity = 1; // إذا لم يكن موجودًا، أضف المنتج بكمية 1
//      currentCart.push(item);
//    }

//    this.cartItems.next([...currentCart]); // تحديث السلة
//  }

//  removeItem(itemId: number) {
//    let currentCart = this.cartItems.value.filter(item => item.id !== itemId);
//    this.cartItems.next([...currentCart]); // تحديث السلة
//  }

//  updateQuantity(itemId: number, quantity: number) {
//    let currentCart = this.cartItems.value.map(item => {
//      if (item.id === itemId) {
//        return { ...item, quantity: quantity };
//      }
//      return item;
//    });

//    this.cartItems.next([...currentCart]); // تحديث السلة
//  }

//  clearCart() {
//    this.cartItems.next([]); // مسح جميع العناصر
//  }

//  // حساب السعر الإجمالي
//  getTotalPrice(): number {
//    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//  }

//  updateCart(updatedCart: any[]) {
//    this.cartItems.next(updatedCart); // تحديث القيم داخل الـ BehaviorSubject
//  }

//}


//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class CartService {
//  private apiUrlCartItem = 'https://67e3f94f2ae442db76d26687.mockapi.io/cartItem';
//  private apiUrlCart = 'https://67e3f94f2ae442db76d26687.mockapi.io/cart';
//  private userId: number = 1; // افتراض معرّف المستخدم

//  constructor(private http: HttpClient) { }

//  // ✅ جلب كل العناصر من السلة
//  getCartItems(): Observable<any[]> {
//    return this.http.get<any[]>(this.apiUrlCartItem);
//  }

//  // ✅ إضافة منتج جديد إلى السلة
//  addToCart(item: any): Observable<any> {
//    return this.http.post<any>(this.apiUrlCartItem, { ...item, quantity: 1 });
//  }

//  // ✅ تحديث كمية منتج معين في السلة
//  updateQuantity(itemId: number, quantity: number): Observable<any> {
//    return this.http.put<any>(`${this.apiUrlCartItem}/${itemId}`, { quantity });
//  }

//  // ✅ حذف منتج معين من السلة
//  removeItem(itemId: number): Observable<any> {
//    return this.http.delete<any>(`${this.apiUrlCartItem}/${itemId}`);
//  }

//  // ✅ مسح السلة بالكامل
//  clearCart(): Observable<any> {
//    return this.http.delete<any>(this.apiUrlCartItem); // تأكد أن الـ API يدعم حذف كل العناصر
//  }

//  // ✅ حساب السعر الإجمالي
//  getTotalPrice(cartItems: any[]): number {
//    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//  }
//}

////////////////////////////////////////////////////


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlCartItem = 'https://67e3f94f2ae442db76d26687.mockapi.io/cartItem';
  private apiUrlCart = 'https://67e3f94f2ae442db76d26687.mockapi.io/cart';
  private userId: number = 1; // افتراض معرّف المستخدم

  constructor(private http: HttpClient) { }

  // ✅ جلب كل العناصر من السلة الخاصة بالمستخدم
  getCartItems(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlCartItem}?userId=${userId}`);
  }


  // ✅ إضافة منتج جديد إلى السلة مع userId
  addToCart(item: any, userId: number): Observable<any> {
    return this.http.post<any>(this.apiUrlCartItem, {
      ...item, // إضافة بيانات المنتج
      userId: userId, // إضافة الـ userId
      quantity: 1 // تحديد الكمية الافتراضية
    });
  }



  // الحصول على userId من BehaviorSubject
  //getUserId(): string | null {
  //  // تأكد من أن هذه الوظيفة ترجع userId بشكل صحيح من الـ BehaviorSubject
  //  return localStorage.getItem('userId') || null;  // مثال بسيط إذا كنت تخزن userId في localStorage
  //}

  // ✅ تحديث كمية منتج معين في السلة
  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlCartItem}/${itemId}`, { quantity });
  }

  // ✅ حذف منتج معين من السلة
  removeItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCartItem}/${itemId}`);
  }

  // ✅ مسح السلة بالكامل
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCartItem}?userId=${this.userId}`);
  }
}


