import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // لتخزين السلة المحلية في الذاكرة
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  // إضافة عنصر إلى السلة
  addToCart(item: any) {
    let currentCart = this.cartItems.value;
    currentCart.push(item);
    this.cartItems.next(currentCart); // تحديث السلة
  }

  // مسح السلة
  clearCart() {
    this.cartItems.next([]); // مسح السلة
  }

  // الحصول على السلة
  getCartItems() {
    return this.cartItems.asObservable();
  }
}
