import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  addProductMsg:string|undefined;
  constructor(private _serv:ProductServiceService){}

  addProduct(data:product){
    this._serv.addProducts(data).subscribe((result)=>{
      if(result){
        this.addProductMsg='product add successfully..'
      }
      setTimeout(()=>(this.addProductMsg=undefined),3000)
    })
  }

  ngOnInit(): void {
    
  }
}
