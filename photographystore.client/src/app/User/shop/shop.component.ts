import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  constructor(private urlService: UrlService, private router: Router) { }

  products: any
 
  ngOnInit(): void {
    this.urlService.getProduct().subscribe(data => {
      this.products = data;
    });
  }
  goToDetails(productId: number) {
    this.router.navigate(['/details', productId]);
  }
}
