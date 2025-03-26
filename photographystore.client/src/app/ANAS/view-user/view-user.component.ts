import { Component } from '@angular/core';
import { AnasSerService } from '../../ANAS_SER/anas-ser.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  constructor(private ser: AnasSerService) { }

  ngOnInit() { this.getusers() }

  Data: any
  getusers() {
    this.ser.getUsers().subscribe((data: any) => {

      this.Data = data

    })
  }
}
