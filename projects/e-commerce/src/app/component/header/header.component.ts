import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { product,userSignup } from '../../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
  menuType:string='default';
  sellerName:string='';
  userName:string ='';
  searchResult:undefined|product[];
  cartItems = 0


  constructor(private router:Router, private _serv:ProductServiceService){}

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.fname;
            this.menuType = 'seller';
        }
        else if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        console.log(userData.fname)
        this.userName = userData.fname
        this.menuType = 'user';
        this._serv.GetCartItemByUserId(userData.id)
        }else{
          console.warn('outside seller');
          this.menuType='default';
        }      
      }
    });


    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this._serv.cartData.subscribe((items)=>{
      this.cartItems=items.length; 
    })

  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['user-auth'])
    this._serv.cartData.emit([])
  }

  searchProductClick(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this._serv.searchProduct(element.value).subscribe((result)=>{
        console.warn(result);
        result.length =5;
        this.searchResult = result;
      })
    }
  }

  searchHide(){
    this.searchResult = undefined;
  }

  searchSubmit(val:string){
    this.router.navigate([`search/${val}`]);
  }

  redirctDetails(id:number){
    this.router.navigate(['/product-details/'+ id])
  }

}
