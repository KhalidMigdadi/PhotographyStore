//import { Component } from '@angular/core';
//import { ProductService } from '../Service/product.service';
//import { CartService } from '../Service/cart.service';

//@Component({
//  selector: 'app-product',
//  templateUrl: './product.component.html',
//  styleUrls: ['./product.component.css'] // ✅ تصحيح الخطأ هنا
//})
//export class ProductComponent {
//  products: any[] = [];

//  constructor(private productService: ProductService, private cartService: CartService) { }

//  ngOnInit(): void {
//    // جلب المنتجات عند تحميل الصفحة
//    this.productService.getProducts().subscribe((data) => {
//      this.products = data;
//    });
//  }

//  // إضافة المنتج إلى السلة
//  addToCart(product: any) {
//    this.cartService.addToCart(product).subscribe(
//      (response) => {
//        console.log('تمت إضافة المنتج بنجاح:', response);
//      },
//      (error) => {
//        console.error('خطأ أثناء إضافة المنتج:', error);
//      }
//    );
//  }
//}





////////////////////////////////////////////








import { Component } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { CartService } from '../Service/cart.service';
import { UrlService } from '../Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private urlService: UrlService // إضافة الخدمة هنا
  ) { }

  ngOnInit(): void {
    // جلب المنتجات عند تحميل الصفحة
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // إضافة المنتج إلى السلة مع userId
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

    // تأكد من أن userId هو عدد
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid User ID!',
        text: 'User ID is not valid.',
      });
      return;
    }

    // إرسال المنتج مع الـ userId إلى الـ CartService
    this.cartService.addToCart(product, userIdNumber).subscribe(
      (response) => {
        console.log('تمت إضافة المنتج بنجاح:', response);
        this.loadCart();  // إعادة تحميل السلة بعد إضافة المنتج
      },
      (error) => {
        console.error('خطأ أثناء إضافة المنتج:', error);
      }
    );
  }
  loadCart() {
    // منطق إعادة تحميل السلة
    console.log('Re-loading cart...');
    // يمكنك إضافة منطق لاسترجاع البيانات من API أو تحديث السلة
  }

}
