import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private ser: AnasSerService) { }

  ngOnInit() { }


  addgate(adddata: any) {

    this.ser.postCategory(adddata).subscribe(() => {

      alert("added done");
    })
  }
}
