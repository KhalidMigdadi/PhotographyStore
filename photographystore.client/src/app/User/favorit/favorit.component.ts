import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrl: './favorit.component.css'
})
export class FavoritComponent {

  constructor(private _htp: UrlService) { }


  ngOnInit() {

    this.showfavorite();



  }

  favorite: any
  showfavorite() {
    const userId = localStorage.getItem('userId'); // استرجاع ID المستخدم
    if (!userId) {
      this.favorite = [];
      return;
    }

    this._htp.ShowF().subscribe((data) => {
      this.favorite = data.filter((item: any) => item.userId === userId);
    });
  }



  DeleteFav(id: any) {
    this._htp.DeleteF(id).subscribe(() => {

      this.showfavorite();

      alert("Product Deleted from Favorite");


    });
  }





}
