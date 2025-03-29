import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private _url: HttpClient) { }



  getAllItems() {

    return this._url.get<any>("https://67e3f94f2ae442db76d26687.mockapi.io/cartItem");
  }


  getAllProductsByID(Id: number) {

    return this._url.get<any>(`https://67ddf63c471aaaa74282f2a0.mockapi.io/product/${Id}`);
 }

  getAllProducts() {

    return this._url.get<any>("https://67ddf63c471aaaa74282f2a0.mockapi.io/product");
  }

  AddOrder(Data: any) {


    return this._url.post("https://67d7325f9d5e3a10152a46a6.mockapi.io/Order", Data);

  }

  AddOrderItem(Data: any) {


    return this._url.post("https://67d7325f9d5e3a10152a46a6.mockapi.io/Order_Item", Data);

  }


}
