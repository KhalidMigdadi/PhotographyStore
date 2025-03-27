//import { Component } from '@angular/core';
//import { CartService } from '../../Service/cart.service';
//import { Router } from '@angular/router';

//@Component({
//  selector: 'app-cart',
//  templateUrl: './cart.component.html',
//  styleUrls: ['./cart.component.css']
//})


//export class CartComponent {
//  cartItems: any[] = [];
//  totalPrice: number = 0;

//  constructor(private cartService: CartService, private router: Router) { }

//  ngOnInit(): void {
//    // get data from the cart
//    this.cartService.cartItems$.subscribe((items) => {
//      this.cartItems = items;
//      this.calculateTotal();
//    });
//  }

//  calculateTotal() {
//    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//  }

//  increaseQuantity(item: any) {
//    item.quantity++;
//    this.cartService.updateQuantity(item.id, item.quantity);
//  }

//  decreaseQuantity(item: any) {
//    if (item.quantity > 1) {
//      item.quantity--;
//      this.cartService.updateQuantity(item.id, item.quantity);
//    }
//  }

//  // حذف المنتج
//  removeItem(itemId: number, event: Event) {
//    event.preventDefault(); // لمنع إعادة تحميل الصفحة
//    const updatedCart = this.cartItems.filter(cartItem => cartItem.id !== itemId);
//    this.cartService.updateCart(updatedCart); // تحديث السلة
//  }






//  // مسح السلة بالكامل
//  clearCart() {
//    this.cartService.clearCart();
//  }



//  goToCheckout() {
//    // حفظ البيانات في الخدمة أو في localStorage
//    //this.cartService.saveCartData(this.cartItems);

//    // أو تخزينها في localStorage
//     localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

//    // الانتقال إلى صفحة الدفع (checkout)
//    this.router.navigate(['/checkout']);

//    // saved cart in checkout ts
//    //this.cartService.saveCartData(this.cartItems);

//    //this.router.navigate(['/checkout'], {
//    //  state: { total: this.totalPrice }  // تمرير المجموع للصفحة
//    //});



//  }

//}


import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;


  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  //  تحميل بيانات السلة من API
  loadCart() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }


  // when i make the userId is dynamic

  //loadCart() {
  //  this.cartService.getCartItems().subscribe((cart) => {
  //    this.cartItems = cart.items;
  //    this.totalPrice = cart.totalPrice;
  //  });
  //}


  // حساب المجموع الكلي
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  //  زيادة الكمية
  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
      this.calculateTotal();
    });
  }

  //  تقليل الكمية
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
        this.calculateTotal();
      });
    }
  }

  //  حذف منتج معين
  removeItem(itemId: number, event: Event) {
    event.preventDefault();
    this.cartService.removeItem(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
      this.calculateTotal();
    });
  }

  //  مسح السلة بالكامل
  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.calculateTotal();
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
    // userId, cart Id and sent total
  }

  // إضافة منتج إلى السلة
  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(() => {
      this.loadCart(); // تحديث السلة بعد الإضافة
    });
  }
}
