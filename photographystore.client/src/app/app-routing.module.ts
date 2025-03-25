import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './User/home/home.component';
import { ShopComponent } from './User/shop/shop.component';
import { FavoritComponent } from './User/favorit/favorit.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { LoginRegisterComponent } from './User/login-register/login-register.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "shop", component: ShopComponent },
  { path: "favorit", component: FavoritComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginRegisterComponent },
  { path: "about", component: AboutUsComponent }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
