import { Component,OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList:undefined|product[]
  msg:undefined|string;
  constructor(private _serv:ProductServiceService){}

  getProducts(){
    this._serv.GetProduct().subscribe((result)=>{
      this.productList=result
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  deletProduct(id:number){
    console.log(id)
    this._serv.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.msg = "Product delete successfully"
      }
      this.getProducts();
    })
    setTimeout(()=>(
      this.msg=undefined
    ),3000)
  }

}
