import { Component, OnInit } from '@angular/core';
import { SellerServiceService } from '../../services/seller-service.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../../data-type';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  showLogin = false;
  authError:string=''
  constructor(private _serv:SellerServiceService, private router:Router){}

  signUp(data:SignUp):void{
    this._serv.userSignUp(data)
  }
  userLogin(data:Login):void{
    this.authError=""
    //console.warn(data)
    this._serv.userLoginIn(data)
    this._serv.loggError.subscribe((Iserorr)=>{
      if(Iserorr){
        this.authError='email or password is invalid'
      }
    }
    )
  }

  openSignUp(){
    this.showLogin = false
  }

  openLoginIn(){
    this.showLogin=true
  }

  ngOnInit(): void {
    this._serv.reloadSeller()
  }


}
