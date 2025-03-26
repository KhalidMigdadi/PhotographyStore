import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private ser: AnasSerService, private rou: ActivatedRoute) { }




  datatoform: any
  ngOnInit() {


    let proid = this.rou.snapshot.paramMap.get("id");
    this.ser.getProductByID(proid).subscribe((data) => {
      this.datatoform = data
    })

  }



  proid: any
  updateproduct(adddata: any) {
    this.proid = this.rou.snapshot.paramMap.get("id");
    this.ser.updateProduct(this.proid, adddata).subscribe(() => {
      alert("edit done");
    })

  }
}
