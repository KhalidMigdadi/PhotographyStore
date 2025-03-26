import { Component } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
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
    this.cartService.addToCart(product);
  }
}
