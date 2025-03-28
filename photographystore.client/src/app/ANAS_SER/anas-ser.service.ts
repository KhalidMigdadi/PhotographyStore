import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnasSerService {

  constructor(private anas: HttpClient) { }


  getUsers() {
    return this.anas.get("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers");
  }
  postUsers(data: any) {
    return this.anas.post("https://67d6ac02286fdac89bc2a229.mockapi.io/ShopUsers", data);
  }
  getCategory() {
    return this.anas.get("https://67ddf63c471aaaa74282f2a0.mockapi.io/category");
  }
  postCategory(data: any) {
    return this.anas.post("https://67ddf63c471aaaa74282f2a0.mockapi.io/category", data);
  }
  getProduct() {
    return this.anas.get("https://67ddf63c471aaaa74282f2a0.mockapi.io/product");
  }
  postProduct(data: any) {
    return this.anas.post("https://67ddf63c471aaaa74282f2a0.mockapi.io/product", data);
  }
  updateCategory(id: any, data: any) {
    return this.anas.put(`https://67ddf63c471aaaa74282f2a0.mockapi.io/category/${id}`, data);
  }
  getCategoryByID(id: any) {
    return this.anas.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/category/${id}`)
  }
  updateProduct(id: any, data: any) {
    return this.anas.put(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`, data);
  }
  getProductByID(id: any) {
    return this.anas.get(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`)
  }
  viewVocher() {
    return this.anas.get("https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser");
  }
  addVocher(data: any) {
    return this.anas.post("https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser", data);
  }
  editVocher(id: any, data: any) {
    return this.anas.put(`https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser/${id}`, data);
  }
  viewVocherByID(id: any) {
    return this.anas.get(`https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser/${id}`);
  }
  deleteCategory(id: any) {
    return this.anas.delete(`https://67ddf63c471aaaa74282f2a0.mockapi.io/category/${id}`);
  }
  deleteProduct(id: any) {
    return this.anas.delete(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${id}`);
  }
  deleteVocher(id: any) {
    return this.anas.delete(`https://67d2b4a390e0670699bec396.mockapi.io/Voucher-peruser/${id}`);
  }



}
