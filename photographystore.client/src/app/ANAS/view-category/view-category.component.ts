import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent {
  constructor(private ser: AnasSerService) { }

  ngOnInit() { this.getCategory() }


  delete(id: any) {
    debugger
    this.ser.deleteCategory(id).subscribe((data) => {
      alert("delete done");
      this.getCategory()
    })

  }

  Data: any
  getCategory() {
    this.ser.getCategory().subscribe((data: any) => {

      this.Data = data

    })
  }
}
