import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _url: HttpClient) { }


  getproducts() {

    return this._url.get<any>("https://67ddf63c471aaaa74282f2a0.mockapi.io/product")

  }


  Addproducts(data:any) {

    return this._url.post<any>("https://67e3f94f2ae442db76d26687.mockapi.io/cartItem",data)
  }


  Addfavorite(favorite: any) {


    return this._url.post<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite", favorite)
  }

  ShowF() {
    return this._url.get<any>("https://67e3d3032ae442db76d1c116.mockapi.io/favorite")


  }

  DeleteF(id: any ) {

    return this._url.delete<any>(`https://67e3d3032ae442db76d1c116.mockapi.io/favorite/${id}` )
  }
}
