import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private ser: AnasSerService) { }

  ngOnInit() { this.getidcate() }

  addpro(adddata: any) {
    this.ser.postProduct(adddata).subscribe(() => {
      alert("added done");
    })

  }

  idcate: any
  getidcate() {
    this.ser.getCategory().subscribe((id) => {
      this.idcate = id
    })


  }
}
