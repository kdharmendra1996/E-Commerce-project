import { Component ,OnInit} from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { Cart, ULogin, product, userSignup } from '../../data-type';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false;
  userStore:string ="";
  authError:string='';
  constructor(private _serv:UserServicesService,private product_serv:ProductServiceService){}

  usersignUp(data:userSignup){
    this._serv.UserSignup(data);
  }

  UserLoginIn(data:ULogin){
    this._serv.UserLoginIn(data);
    this._serv.InvalidloggError.subscribe((Iserror)=>{
      if(Iserror){
        this.authError='Please enter valid user details'
      }else{
        this.localCarToRemoteCart()
      }
    })
  }

  openSignUp(){
    this.showLogin = false
  }

  openLoginIn(){
    this.showLogin=true
  }


  ngOnInit(): void {
    this._serv.userAuthReload();
  }

  localCarToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse('user').id;
    if(data){
      let cartDataList:product[] = JSON.parse(data)

      cartDataList.forEach((product:product,index) => {
        let cartDatas:Cart = {
          ...product,
          productId:product.id,
          userId,
        };
        delete cartDatas.id;
        setTimeout(() => {
          this.product_serv.AddToCart(cartDatas).subscribe((result)=>{
            if(result){
              console.warn('Items stored in DB');
            }
          });
          if(cartDataList.length == index+1){
            localStorage.removeItem('localCart')
          }
        },5000);
      }
        
    );
    }
    setTimeout(()=>{
      this.product_serv.GetCartItemByUserId(userId)
    },2000)
  }



}