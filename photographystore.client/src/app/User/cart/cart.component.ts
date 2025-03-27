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


//import { Component, OnInit } from '@angular/core';
//import { CartService } from '../../Service/cart.service';
//import { Router } from '@angular/router';

//@Component({
//  selector: 'app-cart',
//  templateUrl: './cart.component.html',
//  styleUrls: ['./cart.component.css']
//})
//export class CartComponent implements OnInit {
//  cartItems: any[] = [];
//  totalPrice: number = 0;


//  constructor(private cartService: CartService, private router: Router) { }

//  ngOnInit(): void {
//    this.loadCart();
//  }

//  //  تحميل بيانات السلة من API
//  loadCart() {
//    this.cartService.getCartItems().subscribe((items) => {
//      this.cartItems = items;
//      this.calculateTotal();
//    });
//  }


//  // when i make the userId is dynamic

//  //loadCart() {
//  //  this.cartService.getCartItems().subscribe((cart) => {
//  //    this.cartItems = cart.items;
//  //    this.totalPrice = cart.totalPrice;
//  //  });
//  //}


//  // حساب المجموع الكلي
//  calculateTotal() {
//    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//  }

//  //  زيادة الكمية
//  increaseQuantity(item: any) {
//    item.quantity++;
//    this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
//      this.calculateTotal();
//    });
//  }

//  //  تقليل الكمية
//  decreaseQuantity(item: any) {
//    if (item.quantity > 1) {
//      item.quantity--;
//      this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
//        this.calculateTotal();
//      });
//    }
//  }

//  //  حذف منتج معين
//  removeItem(itemId: number, event: Event) {
//    event.preventDefault();
//    this.cartService.removeItem(itemId).subscribe(() => {
//      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
//      this.calculateTotal();
//    });
//  }

//  //  مسح السلة بالكامل
//  clearCart() {
//    this.cartService.clearCart().subscribe(() => {
//      this.cartItems = [];
//      this.calculateTotal();
//    });
//  }

//  goToCheckout() {
//    this.router.navigate(['/checkout']);
//    // userId, cart Id and sent total
//  }

//  // إضافة منتج إلى السلة
//  addToCart(product: any) {
//    this.cartService.addToCart(product).subscribe(() => {
//      this.loadCart(); // تحديث السلة بعد الإضافة
//    });
//  }
//}







///////////////////////////////////


import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { UrlService } from '../../Service/url.service';  // استيراد UrlService
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // تأكد من أن SweetAlert2 مثبت

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private urlService: UrlService  // إضافة UrlService هنا
  ) { }

  ngOnInit(): void {
    this.loadCart();  // تحميل السلة عندما يتم تحميل المكون
  }

  loadCart() {
    // الاشتراك في BehaviorSubject للحصول على userId الحالي
    const userId = this.urlService.getUserId();

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to view your cart.',
      });
      return;
    }

    // الآن نمرر userId إلى دالة getCartItems
    this.cartService.getCartItems(userId).subscribe(
      (items) => {
        this.cartItems = items || []; // تأكد من أن `cartItems` ليست `undefined`
        this.calculateTotal();
      },
      (error) => {
        console.error('Error loading cart items:', error);
        this.cartItems = []; // تعيين مصفوفة فارغة عند حدوث خطأ
      }
    );

  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
      this.calculateTotal();
    });
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity).subscribe(() => {
        this.calculateTotal();
      });
    }
  }

  removeItem(itemId: number, event: Event) {
    event.preventDefault();
    this.cartService.removeItem(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
      this.calculateTotal();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.calculateTotal();
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  addToCart(product: any) {
    const userId = this.urlService.getUserId();  // الحصول على userId من UrlService
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to the cart.',
      });
      return;
    }

    const userIdNumber = Number(userId);  // التأكد من تحويل userId إلى عدد إذا لزم الأمر.
    if (isNaN(userIdNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid User ID!',
        text: 'The User ID is invalid.',
      });
      return;
    }

    // الآن نمرر userId إلى دالة addToCart
    if (!isNaN(userIdNumber)) {
      this.cartService.addToCart(product, userIdNumber).subscribe(
        (response) => {
          console.log('تمت إضافة المنتج بنجاح:', response);
          this.loadCart();
        },
        (error) => {
          console.error('خطأ أثناء إضافة المنتج:', error);
        }
      );
    } else {
      console.error('User ID is not a valid number');
    }

  }
}
