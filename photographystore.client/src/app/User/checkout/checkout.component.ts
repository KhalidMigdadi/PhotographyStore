/// <reference path="../../app.component.ts" />
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UrlService } from '../../Service/url.service';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../Service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  Total: number = 0;
  Cart_Id: number = 0;
  User_ID: number = 0;
  AllCartBy_ID: any;
  AllProduct_ID: any[] = [];
  Payment_Method: string = "Credit Card";
  OrderItem: any = {};
  constructor(private _ser: CheckoutService, private _getId: ActivatedRoute, private _url: UrlService) { }

  cartId: any;
  userId: any;


  ngOnInit() {

    //this.Cart_Id = Number(this._getId.snapshot.paramMap.get("cartId"));
    //this.User_ID = Number(this._getId.snapshot.paramMap.get("UserId"));
    //this.Total = Number(this._getId.snapshot.paramMap.get("totalPrice"));

    this._url.CartId.subscribe((data) => {
      this.cartId = data;
    })

    this._url.userId$.subscribe((data) => {
      this.userId = data;
    })

    this._getId.queryParamMap.subscribe(params => {
      const price = params.get('totalPrice');
      if (price) {
        this.Total = Number(price);
      }
    });


   
    //this.Total = Number(this._getId.snapshot.paramMap.get("totalPrice"));




    console.log(this.userId)
    console.log(this.cartId)

    console.log(this.Total)


    this.getAllItemByID();


  }

  //getAllItemByID() {

  //  this._ser.getAllItems().subscribe((data: any) => {

  //    this.AllCartBy_ID = data.filter((d: any) => d.Cart_Id == this.cartId);

  //  });

  //}
  getAllItemByID() {
    this._ser.getAllItems().subscribe((data: any) => {
      console.log("Data from API:", data); // ✅ تحقق من البيانات المسترجعة

      // تحويل cartId إلى رقم للتأكد من المطابقة الصحيحة
      this.AllCartBy_ID = data.filter((d: any) => Number(d.cartId) === Number(this.cartId));

      console.log("Filtered Data:", this.AllCartBy_ID); // ✅ تحقق من الفلترة
    });
  }





  AddOrder(data: any) {



    data.User_Id = this.userId;
    data.Cart_Id = this.cartId;

    this._ser.AddOrder(data).subscribe(() => {

      this.OrderItem.Cart_Id = this.cartId;
      this.OrderItem.Total = this.Total;

      this._ser.AddOrderItem(this.OrderItem).subscribe(() => {
        this.showAlert();
      })

    })

  }


  showAlert() {
    Swal.fire({
      title: 'Payment Successful!',
      text: 'Thank you for your purchase. Your order has been placed successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

}
