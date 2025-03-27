import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  constructor(private _http: UrlService) { }

  ngOnInit() {
    this.showdata();



  
  }


  product: any[] = [];
  allProducts: any[] = [];

  showdata() {
    this._http.getproducts().subscribe((data) => {
      this.product = data; 
      this.allProducts = data; 
    });
  



    
  }
  Addtocart(data: any) {

    this._http.Addproducts(data).subscribe(() =>

      alert("Product Added to Cart"))


 
  }


  Addtofavorite(favorite: any) {
    this._http.Addfavorite(favorite).subscribe(() =>

      alert("Product Added to Favorite"))


  }


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



  
  


