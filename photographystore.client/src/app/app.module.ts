import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './User/home/home.component';
import { ShopComponent } from './User/shop/shop.component';
import { FavoritComponent } from './User/favorit/favorit.component';
import { ContactUsComponent } from './User/contact-us/contact-us.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { CartComponent } from './User/cart/cart.component';
import { LoginRegisterComponent } from './User/login-register/login-register.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { ProfileComponent } from './User/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    FavoritComponent,
    ContactUsComponent,
    CheckoutComponent,
    CartComponent,
    LoginRegisterComponent,
    AboutUsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
