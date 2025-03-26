import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnasSerService {

  constructor(private anas: HttpClient) { }


  getUsers() {
    return this.anas.get("https://67cea6ee125cd5af757b6514.mockapi.io/Users");
  }
  postUsers(data: any) {
    return this.anas.post("https://67cea6ee125cd5af757b6514.mockapi.io/Users", data);
  }
  getCategory() {
    return this.anas.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories");
  }
  postCategory(data: any) {
    return this.anas.post("https://67cd64b6dd7651e464ee3d63.mockapi.io/categories", data);
  }
  getProduct() {
    return this.anas.get("https://67cd64b6dd7651e464ee3d63.mockapi.io/products");
  }
  postProduct(data: any) {
    return this.anas.post("https://67cd64b6dd7651e464ee3d63.mockapi.io/products", data);
  }
  updateCategory(id: any, data: any) {
    return this.anas.put(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`, data);
  }
  getCategoryByID(id: any) {
    return this.anas.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`)
  }
  updateProduct(id: any, data: any) {
    return this.anas.put(`https://67cd64b6dd7651e464ee3d63.mockapi.io/products/${id}`, data);
  }
  getProductByID(id: any) {
    return this.anas.get(`https://67cd64b6dd7651e464ee3d63.mockapi.io/products/${id}`)
  }
  viewVocher() {
    return this.anas.get("https://67d9ae8e35c87309f529c67f.mockapi.io/sign/voucher");
  }
  addVocher(data: any) {
    return this.anas.post("https://67d9ae8e35c87309f529c67f.mockapi.io/sign/voucher", data);
  }
  editVocher(id: any, data: any) {
    return this.anas.put(`https://67d9ae8e35c87309f529c67f.mockapi.io/sign/voucher/${id}`, data);
  }
  viewVocherByID(id: any) {
    return this.anas.get(`https://67d9ae8e35c87309f529c67f.mockapi.io/sign/voucher/${id}`);
  }
  deleteCategory(id: any) {
    return this.anas.delete(`https://67cd64b6dd7651e464ee3d63.mockapi.io/categories/${id}`);
  }
  deleteProduct(id: any) {
    return this.anas.delete(`https://67cd64b6dd7651e464ee3d63.mockapi.io/products/${id}`);
  }
  deleteVocher(id: any) {
    return this.anas.delete(`https://67d9ae8e35c87309f529c67f.mockapi.io/sign/voucher/${id}`);
  }



}
