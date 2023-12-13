import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, product } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }
  addProducts(data:product){
    console.warn('Service Call');
    return this.http.post('http://localhost:3000/products',data)
    
  }
  GetProduct():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/products')
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  GetProductById(id:string):Observable<product>{
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:product){
    return this.http.put(`http://localhost:3000/products/${product.id}`,product);
  }

  popularAllProduct():Observable<product[]>{
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyAllProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProduct(query:string):Observable<product[]>{
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data:product){
    let cartItem = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data])
    }else{
      cartItem=JSON.parse(localCart);
      cartItem.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartItem));
      this.cartData.emit(cartItem)
    }
  }

  removeCartItem(ProductId:number){
    let cartsData = localStorage.getItem('localCart');
    if(cartsData){
      let items:product[] = JSON.parse(cartsData);
      items = items.filter((item:product)=>ProductId!==item.id);

      console.warn(items);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToCart(cartData:Cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }

  GetCartItemByUserId(userId:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId,{observe:'response'}).
    subscribe((result)=>{
      console.warn(result);
      
      if(result && result.body){
        this.cartData.emit(result.body)
      }
    })
  }

  removeToCarts(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData =  userStore && JSON.parse(userStore); 
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userData.id}`);
  }

  orderNow(data:Order){
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.http.get<Order[]>('http://localhost:3000/orders?userId='+userData.id)

  }

  deletcCartItem(cartId:number){
    return this.http.delete('http://localhost:3000/cart'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    })
  }

  deleteOrder(orderId:number){
    return this.http.delete(`http://localhost:3000/orders/`+orderId)

  }
}
