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
import { HttpClient } from '@angular/common/http';  // استيراد HttpClient


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  cartItemCount: number = 0;  // إضافة متغير لحساب عدد العناصر في السلة
  voucherCode: string = '';  // تخزين الكود المدخل
  discount: number = 0;  // تخزين الخصم
  originalPrice: number = 0; // السعر الأصلي قبل الخصم
  discountAmount: number = 0;


  constructor(
    private cartService: CartService,
    private router: Router,
    private urlService: UrlService , // إضافة UrlService هنا
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadCart();

    // الاشتراك في cartItemCount$ لمتابعة التحديثات
    //this.cartService.cartItemCount$.subscribe(() => {
    //  this.loadCart(); // إعادة تحميل السلة تلقائيًا عند أي تغيير
    //});
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
        this.cartItems = items || [];  // تأكد من أن cartItems ليست undefined
        this.calculateTotal();
        this.updateCartItemCount();  // تحديث عدد العناصر بعد تحميل السلة
      },
      (error) => {
        console.error('Error loading cart items:', error);
        this.cartItems = [];
        this.cartItemCount = 0;  // تعيين عدد العناصر إلى 0 في حال حدوث خطأ
      }
    );
  }

  updateCartItemCount() {
    this.cartItemCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);  // حساب عدد العناصر
  }


  // في أعلى الكومبوننت


  // تعديل دالة applyVoucher()
  applyVoucher() {
    const userId = this.urlService.getUserId();
    this.http.get<any>(`https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser?Userid=${userId}&name=${this.voucherCode}`)
      .subscribe(
        (voucher) => {
          if (voucher.length > 0) {
            const validVoucher = voucher[0];

            if (validVoucher && validVoucher.discount) {
              this.discount = validVoucher.discount;
              this.originalPrice = this.totalPrice; // حفظ السعر الأصلي

              if (this.discount > 0 && this.discount <= 100) {
                this.discountAmount = this.totalPrice * (this.discount / 100);
                this.totalPrice = this.totalPrice - this.discountAmount;
              }

              Swal.fire('Success', 'Voucher applied successfully!', 'success');
            }
          } else {
            Swal.fire('Error', 'Voucher not found!', 'error');
          }
        },
        (error) => {
          Swal.fire('Error', 'Could not validate voucher. Please try again later.', 'error');
        }
      );
  }



  // دالة لحساب المجموع الكلي للسلة والسعر الأصلي
  updateCartSummary() {
    // حساب السعر الأصلي لجميع العناصر في السلة
    this.originalPrice = this.cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);

    // حساب السعر الإجمالي بعد الخصم
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
    const userId = this.urlService.getUserId();
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to the cart.',
      });
      return;
    }

    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid User ID!',
        text: 'The User ID is invalid.',
      });
      return;
    }

    if (!isNaN(userIdNumber)) {
      this.cartService.addToCart(product, userIdNumber).subscribe(
        (response) => {
          console.log('تمت إضافة المنتج بنجاح:', response);
          this.loadCart();  // إعادة تحميل السلة بعد الإضافة
          this.cartService.updateCartItemCount(this.cartItems.length); // تحديث العدد بعد التعديل
        },
        (error) => {
          console.error('خطأ أثناء إضافة المنتج:', error);
        }
      );
    } else {
      console.error('User ID is not a valid number');
    }
  }

  removeItem(itemId: number, event: Event) {
    event.preventDefault();
    this.cartService.removeItem(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
      this.calculateTotal();
      this.cartService.updateCartItemCount(this.cartItems.length);  // تحديث العدد بعد الحذف
    });
  }


}
