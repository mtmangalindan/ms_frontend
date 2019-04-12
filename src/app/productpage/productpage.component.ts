import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../productlist/productlist.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  
  private productMap = new Map<String,Product>();
  private cartList = new Map<String,Product>();
  private product:Product;
  private errorString: String;
  private prodQty: number;
  constructor(private router:Router,private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get( environment.product + '/product/get/' + localStorage.getItem("currItem")); 
  }
  
  ngOnInit() {
    this.prodQty = JSON.parse(localStorage.getItem("currQty"));
    this.getAll().subscribe(data => {
      console.log(data);
      this.product = data;
    },error=>{
      this.errorString = error;
    });
    
  }


  
  buy(prodId:number,currQty:number){
    try{
        this.cartList = new Map(JSON.parse(localStorage.getItem("cart")));
          if( this.cartList.get(prodId.toString()).qty != 0)
            this.product.qty = (+currQty) + (+this.cartList.get(prodId.toString()).qty);
          else
            this.product.qty = currQty;

      }catch(ex){
            this.product.qty = currQty;
      }
    
    this.cartList.set(prodId.toString(), this.product);
    localStorage.setItem("cart",JSON.stringify(Array.from(this.cartList)));
    this.router.navigateByUrl("/cart");
   }
}

 


