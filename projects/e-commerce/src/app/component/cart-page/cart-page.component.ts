import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Cart, priceSummary } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tex: 0,
    delivery: 0,
    total: 0
  }


  constructor(private _product: ProductServiceService,private router:Router) { }


  loadDetailCart(){
    this._product.currentCart().subscribe((result) => {
      console.log(result)
      this.cartData = result;

      let price = 0
      result.forEach((items) => {
        if(items.quantity){
          price = price + (+items.price* + items.quantity)
        }
      });
      this.priceSummary.price =price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tex = price/8;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price/8)+100 - (price/10);
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
   this.loadDetailCart();
  }

  removeToCart(cartId:number|undefined){
    cartId && this._product.removeToCarts(cartId)
      .subscribe((result) => {
       this.loadDetailCart();
      })
  }

  checkOUT(){
    this.router.navigate(['/checkout'])
  }
}
