import { Component, OnInit } from '@angular/core';
import { UrlService } from '../Service/url.service';
import { CartService } from '../Service/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
//export class NavbarComponent implements OnInit {
//  cartItemCount: number = 0;  // عدد العناصر في السلة
//  totalPrice: number = 0;     // السعر الإجمالي للسلة

//  constructor(
//    private cartService: CartService,
//    private urlService: UrlService
//  ) { }

//  ngOnInit(): void {
//    this.loadCart();  // تحميل السلة عند بداية تحميل الـ component
//  }

//  loadCart() {
//    const userId = this.urlService.getUserId();  // الحصول على userId من الـ UrlService

//    if (!userId) {
//      // إذا لم يكن هناك userId، تأكد من أن المستخدم مسجل دخول
//      return;
//    }

//}

//this.cartService.getCartItems(userId).subscribe(
//  (items) => {
//    this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);  // تحديث عدد العناصر
//    this.totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);  // حساب السعر الإجمالي
//  },
//  (error) => {
//    console.error('Error loading cart items:', error);
//    this.cartItemCount = 0;
//    this.totalPrice = 0;
//  }
//);
//  }

export class NavbarComponent implements OnInit {
  cartItemCount: number = 0; // المتغير لعدد العناصر في السلة
  totalPrice: number = 0; // المتغير لإجمالي السعر
  isLoggedIn: boolean = false;

  constructor(
    private shopUserService: UrlService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shopUserService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      this.loadCart();


    });

    // تحديث العدد بشكل مباشر عند حدوث أي تغيير في السلة
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  loadCart() {
    const userId = this.shopUserService.getUserId();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe((items) => {
        this.cartItemCount = items.length;
        this.totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // تحديث العدد في `cartService`
        this.cartService.updateCartItemCount(items.length);
      });
    }
  }

  // طلب عناصر السلة باستخدام userId
  logout() {
    this.shopUserService.logout();
  }

}




