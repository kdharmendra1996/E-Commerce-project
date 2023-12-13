import { Component,OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Order } from '../../data-type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit{
  orderData:Order[]|undefined;
  constructor(private _product:ProductServiceService){}

  getOrderList(){
    this._product.orderList().subscribe((result)=>{
      if(result){
       this.orderData = result;
      }
     })
  } 

  ngOnInit(): void {
   this.getOrderList();
  }

  CancelOrder(orderId:number|undefined){
    orderId && this._product.deleteOrder(orderId).subscribe(()=>{
      this.getOrderList();
    })
  }
}
