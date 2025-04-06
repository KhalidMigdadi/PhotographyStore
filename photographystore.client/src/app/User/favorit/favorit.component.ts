import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Data } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.css'] // تأكد من أن اسم الملف صحيح
})
export class FavoritComponent {

  constructor(private _htp: UrlService, private cartService: CartService) { }

  ngOnInit() {
    this.showfavorite();
  }

  favorite: any
  showfavorite() {
    // Phantom Was here
    const userId = this._htp.getUserId();
    if (!userId) {
      this.favorite = [];
      return;
    }

    this._htp.ShowF().subscribe((data) => {
      //this.favorite = data.filter((item: any) => item.userId === userId);
      const userFavorites = data.filter((item: any) => item.userId === userId) // Phantom Was here
      this._htp.getProducts().subscribe((allProducts) => {
        this.favorite = userFavorites.map((fav: any) => {
          console.log('Favorite List:', this.favorite);
          const product = allProducts.find((p: any) => p.id == fav.productId);
          return {
            ...fav,
            name: product?.name,
            price: product?.price,
            avatar: product?.img
          };
        });
      });
    });
  }

  // إضافة منتج إلى المفضلة
  addToFavorite(productId: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // أولاً نجيب المفضلة من السيرفر ونتأكد قبل الإضافة
    this._htp.ShowF().subscribe((favorites: any[]) => {
      const userFavorites = favorites.filter(f => f.userId == userId);
      const alreadyExists = userFavorites.some(fav => fav.productId == productId);

      if (alreadyExists) {
        Swal.fire({
          icon: 'info',
          title: 'Already in Favorites',
          text: 'This product is already in your favorites list.'
        });
        return;
      }

      // ما في تكرار، نضيفه للمفضلة
      const newFavorite = { userId, productId };
      this._htp.addToFavorite(newFavorite).subscribe(() => {
        Swal.fire('Added to Favorites!', '', 'success');
        this.showfavorite();
      });
    });
  }

  // حذف منتج من المفضلة
  deleteFavorite(id: any) {
    this._htp.DeleteF(id).subscribe(() => {
      this.showfavorite(); // تحديث المفضلة بعد الحذف
      alert('Product deleted from Favorite');
    });
  }

  addToCart(item: any) {
    const userId = this._htp.getUserId();

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to the cart.',
      });
      return;
    }

    const cartItem = {
      userId: userId,
      productId: item.productId,
      name: item.name,
      price: item.price,
      img: item.avatar,
      quantity: 1
    };

    const userIdNum = Number(userId);
    this.cartService.addToCart(cartItem, userIdNum).subscribe(() => {
      Swal.fire('Added to Cart!', '', 'success');
    });
  }







}
