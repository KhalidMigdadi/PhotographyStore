import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.css'] // تأكد من أن اسم الملف صحيح
})
export class FavoritComponent {

  constructor(private _htp: UrlService) { }

  ngOnInit() {
    this.showFavorite();
  }

  favorite: any[] = [];  // استخدام مصفوفة لتخزين العناصر المفضلة

  // عرض العناصر المفضلة
  showFavorite() {
    const userId = localStorage.getItem('userId'); // استرجاع ID المستخدم
    if (!userId) {
      this.favorite = [];
      return;
    }

    this._htp.ShowF().subscribe((data: any[]) => {
      // تصفية العناصر المفضلة بناءً على userId
      this.favorite = data.filter((item: any) => item.userId === userId);
    });
  }

  // إضافة منتج إلى المفضلة
  addToFavorite(productId: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) return; // التحقق من وجود الـ userId

    // إنشاء الكائن المفضل وإرساله إلى الواجهة الخلفية
    const newFavorite = { userId, productId };
    this._htp.addToFavorite(newFavorite).subscribe(() => {
      alert('Product added to Favorite');
      this.showFavorite(); // تحديث المفضلة بعد الإضافة
    });
  }

  // حذف منتج من المفضلة
  deleteFavorite(id: any) {
    this._htp.DeleteF(id).subscribe(() => {
      this.showFavorite(); // تحديث المفضلة بعد الحذف
      alert('Product deleted from Favorite');
    });
  }
}
