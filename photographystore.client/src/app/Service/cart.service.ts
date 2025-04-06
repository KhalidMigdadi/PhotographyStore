

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlCartItem = 'https://67e3f94f2ae442db76d26687.mockapi.io/cartItem';
  private apiUrlCart = 'https://67e3f94f2ae442db76d26687.mockapi.io/cart';
  private apiUrlVoucher = 'https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser';

  private userId: number = 1;

  private cartItemCount = new BehaviorSubject<number>(0); // عدد عناصر السلة كـ Observable
  cartItemCount$ = this.cartItemCount.asObservable(); // هذا سيتم الاستماع له في `navbar`




  constructor(private http: HttpClient) { }

  // ✅ جلب كل العناصر من السلة الخاصة بالمستخدم
  getCartItems(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlCartItem}?userId=${userId}`);
  }



  updateCartItemCount(count: number) {
    this.cartItemCount.next(count); // تحديث العدد عند تغيير البيانات
  }



  // ✅ إضافة منتج جديد إلى السلة مع userId
  //addToCart(item: any, userId: number): Observable<any> {
  //  return this.http.post<any>(this.apiUrlCartItem, {
  //    ...item, // إضافة بيانات المنتج
  //    userId: userId, // إضافة الـ userId
  //    quantity: 1 // تحديد الكمية الافتراضية
  //  });
  //}

  addToCart(item: any, userId: number): Observable<any> {
    return this.http.post<any>(this.apiUrlCartItem, item).pipe(
      catchError((error) => {
        console.error('Error adding item to cart:', error);
        return throwError(error);
      })
    );
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

  // تحقق من الكود
  getVoucherForUser(userId: string, voucherCode: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrlVoucher}?userId=${userId}&voucherCode=${voucherCode}`).pipe(
      map((vouchers) => vouchers.length > 0 ? vouchers[0] : null)
    );
  }
  cartItems: any[] = [];  // مصفوفة لتخزين عناصر السلة

  Total: number = 0;  // تأكد من تعريف المتغير هنا


  calculateTotal() {
    this.Total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }





}


