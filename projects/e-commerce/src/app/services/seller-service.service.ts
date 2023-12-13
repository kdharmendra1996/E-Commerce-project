import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  loggError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:SignUp){
    this.http.post("http://localhost:3000/seller",data,
    {observe:'response'}).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
      console.warn("result",result)
    })
    
    return false;
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLoginIn(data:Login){
    this.http.get<SignUp[]> (`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body?.length){
        this.loggError.emit(false)
        localStorage.setItem('seller',JSON.stringify(result.body[0]))
        this.router.navigate(['seller-home'])
        console.log("User logged successfully..!")
      }else{
        this.loggError.emit(true)
      }
    })
  }
}
