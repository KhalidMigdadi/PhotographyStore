import { Component, OnInit } from '@angular/core';
import { UrlService } from '../Service/url.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private shopUserService: UrlService) { }

  ngOnInit(): void {
    this.shopUserService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.shopUserService.logout();
  }
}
