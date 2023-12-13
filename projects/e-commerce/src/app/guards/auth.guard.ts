import { CanActivateFn,CanActivate,ActivatedRouteSnapshot,ActivatedRoute,UrlTree,RouterStateSnapshot} from '@angular/router';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import {Injectable ,inject} from '@angular/core'
import { SellerServiceService } from '../services/seller-service.service';



//export const authGuard: CanActivateFn = (route, state) => {
  //const sellerService = inject(SellerServiceService)
  //return sellerService.isSellerLoggedIn
//};


@Injectable({
  providedIn:'root'
})
export class CanActivateTeam implements CanActivate {
  constructor(private _serv:SellerServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {


    if(localStorage.getItem('seller')){
      return true;
    }

    return this._serv.isSellerLoggedIn;
  }
}
