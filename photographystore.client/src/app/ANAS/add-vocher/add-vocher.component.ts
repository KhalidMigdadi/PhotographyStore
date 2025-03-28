import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vocher',
  templateUrl: './add-vocher.component.html',
  styleUrl: './add-vocher.component.css'
})
export class AddVocherComponent {
  constructor(private ser: AnasSerService, private rou: Router) { }


  user:any
  ngOnInit() {
    this.ser.getUsers().subscribe((data) => {
      this.user=data
    })
  }


  addvoch(data: any) {
    this.ser.addVocher(data).subscribe(() => {
      alert("vocher added");
      this.rou.navigate(['/dash/viewvocher']);
    })
  }

}


