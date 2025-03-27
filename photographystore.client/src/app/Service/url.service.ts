import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _url: HttpClient) { }

  getUsers() {
    return this._url.get("https://67cea6ee125cd5af757b6514.mockapi.io/Users");
  }
  getCategory() {
    return this._url.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories");
  }
  getProduct() {
    return this._url.get("https://67ddf63c471aaaa74282f2a0.mockapi.io/product");
  }
  getCategoryByID(id: any) {
    return this._url.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`)
  }
  getProductByID(id: any) {
    return this._url.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`)
  }
  getUserByID(id: any) {
    return this._url.get(`https://67cea6ee125cd5af757b6514.mockapi.io/Users/${id}`);
  }
  addReview(review: any) {
    return this._url.post("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews", review);
  }
  getReviews() {
    return this._url.get("https://67d3051b8bca322cc268e4dc.mockapi.io/reviews");
  }
  getReviewsByProductId(productId: string) {
    return this._url.get(`https://67d3051b8bca322cc268e4dc.mockapi.io/reviews?productId=${productId}`);
  }
}
