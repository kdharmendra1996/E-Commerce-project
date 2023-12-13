import {EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userSignup,ULogin } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  InvalidloggError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router:Router){}

  UserSignup(user:userSignup){
    return this.http.post('http://localhost:3000/users',user,{observe:'response'}).
    subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
    })
  }

  UserLoginIn(data:ULogin){
    this.http.get<userSignup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body?.length ){
        this.InvalidloggError.emit(true);
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/home'])
        console.log("User logged successfully..!")
      }else{
        this.InvalidloggError.emit(false)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}


