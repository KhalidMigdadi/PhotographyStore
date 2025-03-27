import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrl: './favorit.component.css'
})
export class FavoritComponent {

  constructor(private _htp: UrlService   ) { }


  ngOnInit() {

    this.showfavorite();


    
  }

  favorite:any
  showfavorite() {


    return this._htp.ShowF().subscribe((data) =>

      this.favorite = data

    )
  }


  DeleteFav(id: any) {
    this._htp.DeleteF(id).subscribe(() => {

      this.showfavorite();

      alert("Product Deleted from Favorite");


    });
  }


}
