import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './User/home/home.component';
import { ShopComponent } from './User/shop/shop.component';
import { ContactUsComponent } from './User/contact-us/contact-us.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { CartComponent } from './User/cart/cart.component';
import { LoginRegisterComponent } from './User/login-register/login-register.component';
import { AboutUsComponent } from './User/about-us/about-us.component';
import { ProfileComponent } from './User/profile/profile.component';
import { EditCategoryComponent } from './ANAS/edit-category/edit-category.component';
import { EditProductComponent } from './ANAS/edit-product/edit-product.component';
import { AddProductComponent } from './ANAS/add-product/add-product.component';
import { AddCategoryComponent } from './ANAS/add-category/add-category.component';
import { ViewCategoryComponent } from './ANAS/view-category/view-category.component';
import { ViewProductComponent } from './ANAS/view-product/view-product.component';
import { ViewUserComponent } from './ANAS/view-user/view-user.component';
import { ViewVocherComponent } from './ANAS/view-vocher/view-vocher.component';
import { EditVocherComponent } from './ANAS/edit-vocher/edit-vocher.component';
import { AddVocherComponent } from './ANAS/add-vocher/add-vocher.component';
import { DashbordComponent } from './ANAS/dashbord/dashbord.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';


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
    EditCategoryComponent,
    EditProductComponent,
    AddProductComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    ViewProductComponent,
    ViewUserComponent,
    ViewVocherComponent,
    EditVocherComponent,
    AddVocherComponent,
    DashbordComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
