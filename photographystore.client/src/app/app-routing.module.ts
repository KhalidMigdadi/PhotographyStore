import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './User/home/home.component';
import { ShopComponent } from './User/shop/shop.component';
import { FavoritComponent } from './User/favorit/favorit.component';
import { ContactUsComponent } from './User/contact-us/contact-us.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { CartComponent } from './User/cart/cart.component';
import { LoginRegisterComponent } from './User/login-register/login-register.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { ProfileComponent } from './User/profile/profile.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "shop", component: ShopComponent },
  { path: "favorit", component: FavoritComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginRegisterComponent },
  { path: "about", component: AboutUsComponent },
  { path: "profile", component: ProfileComponent },


  {
    path: "dashboard", component: DashboardComponent }







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
