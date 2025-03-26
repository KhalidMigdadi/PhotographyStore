import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  constructor(private ser: AnasSerService, private rou: ActivatedRoute) { }




  datatoform: any
  ngOnInit() {


    let cateid = this.rou.snapshot.paramMap.get("id");
    this.ser.getCategoryByID(cateid).subscribe((data) => {
      this.datatoform = data
    })

  }



  categoryid: any
  updatecategory(adddata: any) {
    this.categoryid = this.rou.snapshot.paramMap.get("id");
    this.ser.updateCategory(this.categoryid, adddata).subscribe(() => {
      alert("edit done");
    })

  }
}
