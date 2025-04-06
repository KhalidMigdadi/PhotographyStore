//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class FavoriteService {

//  private apiUrlFavorite = 'https://67d2b4a390e0670699bec396.mockapi.io/favorite';  // رابط API للمفضلة

//  constructor(private http: HttpClient) { }

//  // ✅ جلب قائمة المفضلة للمستخدم
//  getFavorites(userId: string): Observable<any[]> {
//    return this.http.get<any[]>(`${this.apiUrlFavorite}?userId=${userId}`);
//  }

//  // ✅ إضافة منتج إلى المفضلة
//  addToFavorite(item: any, userId: number): Observable<any> {
//    return this.http.post<any>(this.apiUrlFavorite, {
//      ...item,
//      userId: userId,
//    });
//  }

//  // ✅ إزالة منتج من المفضلة
//  removeFromFavorite(itemId: number): Observable<any> {
//    return this.http.delete<any>(`${this.apiUrlFavorite}/${itemId}`);
//  }
//}
