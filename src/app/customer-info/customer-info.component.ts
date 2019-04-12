import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../productlist/productlist.component';
import { Customer } from '../checkout/checkout.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  prevCartMap = new Map<String,Product>();
  private transactionId:number;
  customer: Customer;
  
  constructor(private router: Router,private http:HttpClient) { }

  ngOnInit() {
    console.log(localStorage.getItem("transactionId"));
    this.transactionId = JSON.parse(localStorage.getItem("transactionId"));
    console.log(this.transactionId);
    this.prevCartMap = new Map(JSON.parse(localStorage.getItem("prevCart")));
    this.customer = JSON.parse(localStorage.getItem("currCustomer")); 
    console.log(this.customer);
  }
  
  reset(){
    localStorage.removeItem("prevCart");
    localStorage.removeItem("currCustomer");
    this.router.navigateByUrl("/");
  }

  subTotal(prodId:String){
    return this.prevCartMap.get(prodId).qty * this.prevCartMap.get(prodId).prodPrice;
  }

  Billout(){
    this.router.navigateByUrl("/payment")
  }

  cancelOrder(transactionId:number): Observable<any> {
    
    var id = this.transactionId+2;
    console.log(transactionId);
    let result: Observable<Object>;
    result = this.http.delete( environment.order + "/order/cancelOrder/" + transactionId);
    return result;
 }

 cancel(){
  let isCanceled : boolean = false;
  let erroMsg : String = "no error";
  this.cancelOrder(this.transactionId).subscribe(response => {
     isCanceled = response;
     alert("Order Canceled");
     this.router.navigateByUrl("/");
  }, error => { erroMsg = error});
  console.log(isCanceled);
  console.log(erroMsg);
}

  total(){
    var total = 0;
    this.prevCartMap.forEach(item=>{
      total += (+item.prodPrice) * (+item.qty);
    });

    localStorage.setItem("TotalPrice",total.toString());
    return total;
  }
}
