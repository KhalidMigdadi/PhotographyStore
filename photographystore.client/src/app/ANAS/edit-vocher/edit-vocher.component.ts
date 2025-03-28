import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vocher',
  templateUrl: './edit-vocher.component.html',
  styleUrl: './edit-vocher.component.css'
})
export class EditVocherComponent {
  constructor(private ser: AnasSerService, private rou: ActivatedRoute, private rout: Router) { }
  datatoview: any
  ngOnInit() {
    let idd = this.rou.snapshot.paramMap.get("id");
    this.ser.viewVocherByID(idd).subscribe((data: any) => {
      this.datatoview = data
    })
  }


  edittvoch(data: any) {
    let id = this.rou.snapshot.paramMap.get("id");
    this.ser.editVocher(id, data).subscribe(() => {
      alert("edit done");
      this.rout.navigate(['/dash/viewvocher']);

    })
  }
}
