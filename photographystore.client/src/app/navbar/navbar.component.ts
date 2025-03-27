import { Component, OnInit } from '@angular/core';
import { UrlService } from '../Service/url.service';
import { CartService } from '../Service/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;  // عدد العناصر في السلة
  totalPrice: number = 0;     // السعر الإجمالي للسلة

  constructor(
    private cartService: CartService,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.loadCart();  // تحميل السلة عند بداية تحميل الـ component
  }

  loadCart() {
    const userId = this.urlService.getUserId();  // الحصول على userId من الـ UrlService

    if (!userId) {
      // إذا لم يكن هناك userId، تأكد من أن المستخدم مسجل دخول
      return;
    }
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private shopUserService: UrlService) { }

  ngOnInit(): void {
    this.shopUserService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

    // طلب عناصر السلة باستخدام userId
    this.cartService.getCartItems(userId).subscribe(
      (items) => {
        this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);  // تحديث عدد العناصر
        this.totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);  // حساب السعر الإجمالي
      },
      (error) => {
        console.error('Error loading cart items:', error);
        this.cartItemCount = 0;
        this.totalPrice = 0;
      }
    );
  }
  logout() {
    this.shopUserService.logout();
  }
}
