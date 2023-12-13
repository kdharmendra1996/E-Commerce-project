import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { Cart, product } from '../../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  removeCart: boolean = false;

  cartData: product | undefined;
  productDetails: undefined | product;
  constructor(private _serv: ProductServiceService, private activateRaoute: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = this.activateRaoute.snapshot.paramMap.get('ProductId')

    productId && this._serv.GetProductById(productId).subscribe((result) => {
      this.productDetails = result;
      console.warn(result)
    })

    let cartDatas = localStorage.getItem('localCart');
    if (productId && cartDatas) {
      let items = JSON.parse(cartDatas);
      items = items.filter(
        (item: product) => productId === item.id.toString()
      );
      if (items.length) {
        this.removeCart = true;
      }
      else {
        this.removeCart = false;
      }
    }

    let user = localStorage.getItem('user');
    if (user) {
      let userId = JSON.parse(user).id;
      this._serv.GetProductById(userId)

      this._serv.cartData.subscribe((result) => {
        let item = result.filter(
          (item: product) =>
            productId?.toString() == item.productId?.toString()
        );
        if (item.length) {
          this.cartData = item[0]
          this.removeCart = true;
        }
      })
    }

  }

  count: number = 0;
  HandleQty(val: string) {
    if (this.count < 20 && val == 'plus') {
      this.count = this.count + 1;
    } else if (this.count > 1 && val == 'min') {
      this.count = this.count - 1
    }
  }

  AddToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.count;
      if (!localStorage.getItem('user')) {
        this._serv.localAddToCart(this.productDetails);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        console.warn('User is loggin now', userId);
        let cartAllData: Cart = {
          ...this.productDetails, //you get all data related to produc add
          userId,
          productId: this.productDetails.id
        }
        delete cartAllData.id;
        console.warn(cartAllData);
        this._serv.AddToCart(cartAllData).subscribe((result) => {
          if (result) {
            alert('Product Add to Cart')
            this._serv.GetCartItemByUserId(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this._serv.removeCartItem(productId);
    } else {
      console.log('cartData',this.cartData);

      this.cartData && this._serv.removeToCarts(this.cartData.id)
      .subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this._serv.GetCartItemByUserId(userId)
      })
      this.removeCart = false;
    }

  }

}
