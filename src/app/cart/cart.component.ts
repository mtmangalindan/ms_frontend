import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../productlist/productlist.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartList = new Map<number,Product>();
  public products: Array<Product>;
  

  constructor(private router : Router,private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get(environment.product + '/product/get');
  }

  ngOnInit() {
    this.cartList = new Map(JSON.parse(localStorage.getItem("cart")));
    this.getAll().subscribe(data => {
      console.log(data);
      this.products = data;
    });
   
  }

  continueShopping(){
    this.router.navigateByUrl('/productlist');
  }


  removeItem(prodId:number){
    console.log(prodId.toString());
    console.log(this.cartList);
    this.cartList.delete(prodId);
    console.log(this.cartList);
    localStorage.clear();
    localStorage.setItem("cart",JSON.stringify(Array.from(this.cartList)));
    this.cartList.clear();
    console.log(this.cartList);
    this.cartList = new Map(JSON.parse(localStorage.getItem("cart")));
    console.log(this.cartList);
  }
  

  onQtyChange(prodId:number,qty:number){
    this.cartList.get(prodId).qty = qty;
    localStorage.setItem("cart",JSON.stringify(Array.from(this.cartList)));
   
  }

  subTotal(prodId:number){
    return this.cartList.get(prodId).qty * this.cartList.get(prodId).prodPrice;
  }

  total(){
    var total = 0;
    this.cartList.forEach(item=>{
      total += (+item.prodPrice) * (+item.qty);
    });

    return total;
  }

  Checkout(){
    var isOutOfStock = false;

    this.products.forEach(product =>{
      this.cartList.forEach(cartItem =>{
        if(product.prodId == cartItem.prodId){
          if(product.prodQty < cartItem.qty){
            isOutOfStock = true;
            alert(product.prodName + " is out of stock by " + Math.abs((+product.prodQty) - (+cartItem.qty)));
          }
        }
     })
    })

    if(!isOutOfStock){
      this.router.navigateByUrl("/checkout");
    }

 }

  searchItemById(prodId:number){
    for(var i = 0; i < this.products.length; i++){
        let item : Product = this.products[i];
        if(item.prodId == prodId)
          return item;
    }
}

}
