import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProducts:undefined|product[];
  trendyProducts:undefined|product[];
  constructor(private _serv:ProductServiceService){}

  PopulerProduct(){
    this._serv.popularAllProduct().subscribe((data)=>{
      console.warn(data)
      this.popularProducts =data;
    })
  }

  TrendyProduct(){
    this._serv.trendyAllProduct().subscribe((data)=>{
      console.warn(data)
      this.trendyProducts =data;
    })
  }

  ngOnInit(): void {
    this.PopulerProduct();
    this.TrendyProduct();
  }

}
