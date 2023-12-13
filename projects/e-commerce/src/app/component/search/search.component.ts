import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined|product[]
  constructor(private _serv:ProductServiceService,private activeRoute:ActivatedRoute){}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');

    query && this._serv.searchProduct(query).subscribe((result)=>{
      this.searchResult =result;
    })
  }
}
