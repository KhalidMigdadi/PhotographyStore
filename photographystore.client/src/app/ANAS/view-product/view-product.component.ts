import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  constructor(private ser: AnasSerService, private rou: ActivatedRoute) { }

  ngOnInit() { this.getproduct() }

  delete(id: any) {
    this.ser.deleteProduct(id).subscribe((data) => {
      alert("delete done");
      this.getproduct()
    })

  }



  Data: any
  getproduct() {

    return this.ser.getProduct().subscribe((data: any) => {
      this.Data = data

    })

  }

}
