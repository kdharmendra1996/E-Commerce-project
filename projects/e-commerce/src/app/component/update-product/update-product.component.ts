import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  productMsg:undefined|string;
  productData:undefined|product;

  constructor(private route:ActivatedRoute, private _serv:ProductServiceService){}

  ngOnInit(): void {
    let Productid = this.route.snapshot.paramMap.get('id');
    Productid && this._serv.GetProductById(Productid).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    });
  }

  updateProductClick(data:product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this._serv.updateProduct(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.productMsg="Product has Updated successfully";
      }
    });
    setTimeout(()=>(this.productMsg=undefined),3000)
  }
}
