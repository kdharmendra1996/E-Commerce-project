import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { SingupComponent } from './component/singup/singup.component';
import { HomeComponent } from './component/home/home.component';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { CanActivateTeam } from './guards/auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerShowProductComponent } from './seller-show-product/seller-show-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { UserAuthComponent } from './component/user-auth/user-auth.component';
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { MyorderComponent } from './component/myorder/myorder.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'header',component:HeaderComponent},
  {path:'signup',component:SingupComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[CanActivateTeam]},
  {path:'add-product',component:SellerAddProductComponent,canActivate:[CanActivateTeam]},
  {path:'show-product',component:SellerShowProductComponent,canActivate:[CanActivateTeam]},
  {path:'update-product/:id',component:UpdateProductComponent,canActivate:[CanActivateTeam]},
  {path:'search/:query',component:SearchComponent},
  {path:'product-details/:ProductId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout',component:CheckOutComponent},
  {path:'myorder',component:MyorderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
