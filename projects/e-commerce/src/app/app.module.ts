import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { SingupComponent } from './component/singup/singup.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerShowProductComponent } from './seller-show-product/seller-show-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { UserAuthComponent } from './component/user-auth/user-auth.component';
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { MyorderComponent } from './component/myorder/myorder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingupComponent,
    HomeComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerShowProductComponent,
    UpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckOutComponent,
    MyorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
