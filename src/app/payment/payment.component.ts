import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaction, Customer } from '../checkout/checkout.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private transactionId:number;
  private transaction:Transaction;
  private price:number;


  constructor(private router:Router,private http: HttpClient) { }

  ngOnInit() {
    this.transactionId = JSON.parse(localStorage.getItem("transactionId"));
    console.log(this.transactionId);
  }


  Billout(paymentType:String){
    var today = new Date();
    var today2 : String;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
   
    today2 = mm + '/' + dd + '/' + yyyy;
    this.price = JSON.parse(localStorage.getItem("TotalPrice"));
    let payment = new Payment(this.transactionId,paymentType,this.price,today2,"Paid");

    console.log(payment);
    let paymentResponse:Payment;
    let errorMsg:String = "no error";

    this.addPayment(payment).subscribe(response => {
      paymentResponse = response;
    }, error => { errorMsg = error} );
    console.log(paymentResponse);
    console.log(errorMsg);

    alert("Payment successful");
    this.router.navigateByUrl("/")
  }



  addPayment (payment :Payment): Observable<any> {
     let result : Observable<Object>;
     result = this.http.post(environment.payment + "/payment/add", payment);
     return result;
   }
}

export class Payment{

  constructor(private orderId:number,private paymentType:String,private amount:number,
              private paymentDate:String,private status:String){}

}

