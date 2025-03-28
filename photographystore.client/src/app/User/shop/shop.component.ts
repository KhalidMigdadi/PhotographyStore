//import { Component } from '@angular/core';
//import { UrlService } from '../../Service/url.service';

//@Component({
//  selector: 'app-shop',
//  templateUrl: './shop.component.html',
//  styleUrl: './shop.component.css'
//})
//export class ShopComponent {

//  constructor(private _http: UrlService) { }

//  ngOnInit() {
//    this.showdata();




//  }


//  product: any[] = [];
//  allProducts: any[] = [];

//  showdata() {
//    this._http.getproducts().subscribe((data) => {
//      this.product = data;
//      this.allProducts = data;
//    });





//  }
//  Addtocart(data: any) {

//    this._http.Addproducts(data).subscribe(() =>

//      alert("Product Added to Cart"))



//  }


//  Addtofavorite(favorite: any) {
//    this._http.Addfavorite(favorite).subscribe(() =>

//      alert("Product Added to Favorite"))


//  }


// sortProducts(event: any) {
//  const value = event.target.value;

//  if (value === 'trending') {
//    this.product = this.product.sort((a, b) => b.trending - a.trending);
//  } else if (value === 'sales') {
//    this.product = this.product.sort((a, b) => b.sales - a.sales);
//  } else if (value === 'rating') {
//    this.product = this.product.sort((a, b) => b.rating - a.rating);
//  } else if (value === 'date') {
//    this.product = this.product.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//  } else if (value === 'price-asc') {
//    this.product = this.product.sort((a, b) => a.price - b.price);
//  } else if (value === 'price-desc') {
//    this.product = this.product.sort((a, b) => b.price - a.price);
//  }
//}

//  }

import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { CartService } from '../../Service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  product: any[] = [];
  allProducts: any[] = [];
  favoriteList: any[] = []; // ✅ تخزين المنتجات المفضلة

  constructor(private urlService: UrlService, private cartService: CartService) { }

  ngOnInit() {
    this.showdata();
    this.loadFavorites(); // ✅ تحميل المنتجات المفضلة عند فتح الصفحة
  }

  // ✅ جلب المنتجات من API
  showdata() {
    this.urlService.getproducts().subscribe((data) => {
      this.product = data;
      this.allProducts = data;
    });
  }

  // ✅ تحميل قائمة المفضلة بناءً على `userId`
  loadFavorites() {
    const userId = this.urlService.getUserId();
    if (!userId) return;

    this.urlService.getFavorites().subscribe((favorites) => {
      this.favoriteList = favorites.filter((item: any) => item.userId == userId);
    });
  }

  // ✅ إضافة المنتج إلى السلة مع userId
  Addtocart(product: any) {
    const userId = this.urlService.getUserId(); // جلب userId من خدمة UrlService

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to the cart.',
      });
      return;
    }

    const userIdNumber = Number(userId); // تحويل userId إلى رقم

    this.cartService.addToCart(product, userIdNumber).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${product.name} has been added to your cart.`,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  // ✅ إضافة المنتج إلى المفضلة بعد التحقق من عدم وجوده مسبقًا
  addToFavorite(product: any) {
    const userId = this.urlService.getUserId(); // جلب `userId` من الخدمة

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to favorites.',
      });
      return;
    }

    // التحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة
    const isAlreadyInFavorites = this.favoriteList.some(
      (fav) => fav.productId === product.id && fav.userId == userId
    );

    if (isAlreadyInFavorites) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Favorites!',
        text: `${product.name} is already in your favorites.`,
      });
      return;
    }

    // إنشاء كائن المفضلة مع `userId`
    const favoriteItem = {
      userId: userId,
      productId: product.id,
      name: product.name, // إضافة اسم المنتج لتجنب `undefined`
      image: product.image,
      price: product.price
    };

    // إرسال المنتج إلى API
    this.urlService.addToFavorite(favoriteItem).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Added to Favorites!',
        text: `${product.name} has been added to your favorites.`,
        timer: 1500
      });

      // تحديث القائمة المحلية للمفضلة بعد الإضافة
      this.favoriteList.push(favoriteItem);
    });
  }

  // ✅ ترتيب المنتجات
  sortProducts(event: any) {
    const value = event.target.value;

    if (value === 'trending') {
      this.product = this.product.sort((a, b) => b.trending - a.trending);
    } else if (value === 'sales') {
      this.product = this.product.sort((a, b) => b.sales - a.sales);
    } else if (value === 'rating') {
      this.product = this.product.sort((a, b) => b.rating - a.rating);
    } else if (value === 'date') {
      this.product = this.product.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (value === 'price-asc') {
      this.product = this.product.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      this.product = this.product.sort((a, b) => b.price - a.price);
    }
  }

}
