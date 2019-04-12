import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
@Injectable({providedIn: 'root'})
export class ProductlistComponent implements OnInit {

  private product : Product;
  private cartList = new Map<number,Product>();
  products:Array<Product>
  constructor(private router : Router,private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get(environment.product + "/product/get");
   // return this.http.get("http://productService/product/get");
  }

  ngOnInit() {
    //localStorage.clear()
    console.log("mmm");
    console.log(environment.product);
     this.getAll().subscribe(data => {
      console.log(data);
      this.products = data; 
    },error=>{console.log(error);}) 
  }

  toProduct(prodId:number, prodQty:number){
    localStorage.setItem("currItem",prodId.toString());
    localStorage.setItem("currQty",prodQty.toString());
    this.router.navigateByUrl("/productpage");
  }

  buy(prodId:number,currQty:number){

    this.product = this.searchItemById(prodId);

    try{
        this.cartList = new Map(JSON.parse(localStorage.getItem("cart")));
          if( this.cartList.get(prodId).qty != 0)
            this.product.qty = (+currQty) + (+this.cartList.get(prodId).qty);
          else
            this.product.qty = currQty;

      }catch(ex){
            this.product.qty = currQty;
      }
    
    this.cartList.set(this.product.prodId, this.product);
    localStorage.setItem("cart",JSON.stringify(Array.from(this.cartList)));
    console.log(this.product.prodId);
    this.router.navigateByUrl("/cart");
   }

   searchItemById(prodId:number){
      for(var i = 0; i < this.products.length; i++){
          let item : Product = this.products[i];
          if(item.prodId == prodId)
            return item;
      }
  }
  
}

export class Product{
  prodId:number;
  prodName:String;
  prodDesc:String;
  prodQty:number;
  prodPrice:number;

  constructor(id:number,name:String,desc:String,price:number,qty:number){
    this.prodId = id;
    this.prodName = name;
    this.prodDesc = desc;
    this.prodPrice = price;
    this.prodQty = qty;
  }

  public set qty(qty){
    this.prodQty = qty;
  }

  public get qty(): number{
    return this.prodQty;
  }
}


