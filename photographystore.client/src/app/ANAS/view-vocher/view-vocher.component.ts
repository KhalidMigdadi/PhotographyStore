import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';

@Component({
  selector: 'app-view-vocher',
  templateUrl: './view-vocher.component.html',
  styleUrl: './view-vocher.component.css'
})
export class ViewVocherComponent {
  constructor(private ser: AnasSerService) { }

  ngOnInit() { this.viewvochh() }


  delete(id: any) {
    this.ser.deleteVocher(id).subscribe((data) => {
      alert("delete done");
      this.viewvochh()
    })

  }




  viewdata: any
  viewvochh() {
    this.ser.viewVocher().subscribe((data: any) => {
      this.viewdata = data
    })
  }
}
