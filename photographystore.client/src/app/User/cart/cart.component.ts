import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // جلب العناصر من السلة
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // مسح السلة
  clearCart() {
    this.cartService.clearCart();
  }


}
