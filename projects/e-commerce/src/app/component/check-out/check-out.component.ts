import { Component } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Cart, Order } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  totalAmount: undefined | number;
  cartData: Cart[] | undefined;
  msg:string|undefined;

  constructor(private _product: ProductServiceService, private router: Router) { }

  ngOnInit(): void {

    this._product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * + items.quantity)
        }
      });
      this.totalAmount = price + (price / 8) + 100 - (price / 10);
    })
  }


  OrderNow(data: { email: string, address: string, contact: string, pin: number }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    
    if (this.totalAmount) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalAmount,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item)=>{ //for remove  cart number
        setTimeout(() => {
          item.id && this._product.deletcCartItem(item.id)
        }, 6000);
       
      })
      this._product.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert('Your order has been  place..');
          this.msg = 'Your order has been  place..'
         setTimeout(() => {
          this.router.navigate(['/myorder'])
          this.msg =undefined;
         }, 4000);
        }
      })
    }
  }
}
