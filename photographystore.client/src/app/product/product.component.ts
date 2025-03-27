import { Component } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // ✅ تصحيح الخطأ هنا
})
export class ProductComponent {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    // جلب المنتجات عند تحميل الصفحة
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // إضافة المنتج إلى السلة
  addToCart(product: any) {
    this.cartService.addToCart(product).subscribe(
      (response) => {
        console.log('تمت إضافة المنتج بنجاح:', response);
      },
      (error) => {
        console.error('خطأ أثناء إضافة المنتج:', error);
      }
    );
  }
}
