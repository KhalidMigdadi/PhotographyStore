import { Component } from '@angular/core';
import { CategoryService } from '../../Service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: any[] = [];
  products: any[] = [];
  categorizedProducts: { [key: string]: any[] } = {};


  constructor(private categoryService: CategoryService) { }


  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadProducts();
    });
  }


  loadProducts() {
    this.categoryService.getProducts().subscribe(products => {
      this.products = products;

      // تصنيف المنتجات حسب الـ Category وعرض أول 5 منتجات فقط
      this.categorizedProducts = {};
      this.categories.forEach(category => {
        this.categorizedProducts[category.name] = this.products
          .filter(product => product.categoryId === category.id)
          .slice(0, 8); // تحديد الحد الأقصى بـ 5 منتجات لكل فئة
      });
    });
  }



}
