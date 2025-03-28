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
import { ViewCategoryComponent } from './ANAS/view-category/view-category.component';
import { ViewProductComponent } from './ANAS/view-product/view-product.component';
import { AddCategoryComponent } from './ANAS/add-category/add-category.component';
import { AddProductComponent } from './ANAS/add-product/add-product.component';
import { EditCategoryComponent } from './ANAS/edit-category/edit-category.component';
import { ViewVocherComponent } from './ANAS/view-vocher/view-vocher.component';
import { AddVocherComponent } from './ANAS/add-vocher/add-vocher.component';
import { EditVocherComponent } from './ANAS/edit-vocher/edit-vocher.component';
import { DashbordComponent } from './ANAS/dashbord/dashbord.component';
import { EditProductComponent } from './ANAS/edit-product/edit-product.component';
import { ViewUserComponent } from './ANAS/view-user/view-user.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { DetailsComponent } from './User/details/details.component';
import { ProductComponent } from './product/product.component';


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
  { path: "details", component: DetailsComponent },
  { path: "product", component: ProductComponent },





  {
    path: "dashboard", component: DashboardComponent, children: [



  ] },
  {  path: "dashboard", component: DashboardComponent },



  
  {
    path: 'dash', component: DashbordComponent, children: [

      { path: 'viewcategory', component: ViewCategoryComponent },
      { path: 'viewproduct', component: ViewProductComponent },
      { path: 'addcategory', component: AddCategoryComponent },
      { path: 'addproduct', component: AddProductComponent },
      { path: 'editcategory/:id', component: EditCategoryComponent },
      { path: 'viewvocher', component: ViewVocherComponent },
      { path: 'editvocher/:id', component: EditVocherComponent },
      { path: 'addvocher', component: AddVocherComponent },
      { path: 'editproduct/:id', component: EditProductComponent },
      { path: 'viewuser', component: ViewUserComponent },




    ]
  }
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
