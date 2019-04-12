import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../productlist/productlist.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cartList = new Map<String,Product>();
  private productMap = new Map<String,Product>();
  private customerMap = new Map<String,CustomerNew>();
  private errorMsg:String;
  private prodIdList: Array<number>;
  private prodQtyList: Array<number>;
  private request: Request;


  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.cartList = new Map(JSON.parse(localStorage.getItem("cart")));
  }


  cart(){
    this.router.navigateByUrl('/cart'); 
  }

  subTotal(prodId:String){
    return this.cartList.get(prodId).qty * this.cartList.get(prodId).prodPrice;
  }

  total(){
    var total = 0;
    this.cartList.forEach(item=>{
      total += (+item.prodPrice) * (+item.qty);
    });

    return total;
  }

  Billout(email:string,firstName:string,lastName:string,gender:string,address1:string,address2:string,city:string,
    country:string,postalCode:string,phone:string,paymentMethod:string,cardNum:string,
    cardExpMonth:string,cardExpYear:string,cardSecurityCode:string){

    var isOutOfStock = false;

    this.productMap = new Map(JSON.parse(localStorage.getItem("productList")));
    this.productMap.forEach(product =>{
      this.cartList.forEach(cartItem =>{
        if(product.prodId == cartItem.prodId){
          if(product.prodQty >= cartItem.qty){
            var newQty = (+product.prodQty) - (+cartItem.qty);
            product.prodQty = newQty;
            console.log(product.prodQty);
          }else{
            isOutOfStock = true;
            alert(product.prodName + " is out of stock by " + Math.abs((+product.prodQty) - (+cartItem.qty)));
          }
        }
     })
    })

    if(!isOutOfStock){   

      var today = new Date();
      var today2 : String;
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      today2 = mm + '/' + dd + '/' + yyyy;
     
      let customer1 = new CustomerNew(email,gender,firstName,lastName,address1,address2,city,
        country,postalCode,"Manila");

      this.customerMap.set(email.toString(),customer1);
    

      console.log(this.cartList);
      let counter : number = 0;
      this.prodIdList = new Array<number>();
      this.prodQtyList = new Array<number>();
      this.cartList.forEach(cartItem=>{
        console.log("test");
        console.log(cartItem);
          this.prodIdList[counter] = cartItem.prodId;
          this.prodQtyList[counter] = cartItem.qty;
          counter++;
      });

      let customer = new Customer(email,gender,firstName,lastName,address1,address2,city,
        country,postalCode,city);
      let response :Request;
      let transaction = new Transaction(this.total(),today2,"card",this.prodIdList,this.prodQtyList);
      let request = new Request(transaction,customer);
      let transactionId: number;

      this.addOrder(request).subscribe(result => {
        response = result;
        console.log(result);
        transactionId = response.transaction.transactionId;
        console.log(transactionId);
        localStorage.setItem("transactionId",transactionId.toString());
        console.log(localStorage.getItem("transactionId"));
        this.router.navigateByUrl("/customerinfo");
      }, error => {this.errorMsg = error});
      

      localStorage.setItem("customerList",JSON.stringify(Array.from(this.customerMap)));
      localStorage.setItem("prevCart", JSON.stringify(Array.from(this.cartList)));
      localStorage.setItem("currCustomer", JSON.stringify(customer));
      localStorage.removeItem("cart");

      
    }
 }

 addOrder (request :Request): Observable<any> {
   console.log(request);
    let result : Observable<Object>;
    result = this.http.post(environment.order + "/order/add", request);
    return result;
  }


} 


export class Request{
  constructor(public transaction: Transaction,public customer: Customer){}

  public get getTransaction(){
    return this.transaction;
  }

  public get getCustomer(){
    return this.customer;
  }
}

export class Transaction{
    public transactionId:number;

      constructor(public transactionBill: number,public transactionDate: String,
        public transactionPaymentMethod: String,public prodIdList: Array<number>,
        public  prodQtyList: Array<number> ){}
}

export class Customer{
  constructor(public email:String,public first_name:String,public last_name:String, public gender:String,
    public street1:String,public street2:String,public city:String,public country:String,
    public postal:String,public province:String){ }
}


export class CustomerNew{

  constructor(private email:String,private firstName:String,private lastName:String, private gender:String,
    private street1:String,private street2:String,private city:String,private country:String,
    private postalCode:String,private province:String){ }

    public get getEmail(){
      return this.email;
    }

    public get getGender(){
      return this.gender;
    }

    public get getFirstName(){
      return this.firstName;
    }

    public get getLastName(){
      return this.lastName;
    }

    public get getStreet1(){
      return this.street1;
    }

    public get getStreet2(){
      return this.street2;
    }

    public get getCity(){
      return this.city;
    }

    public get getCountry(){
      return this.country;
    }

    public get getPostalCode(){
      return this.postalCode;
    }


    public get getProvince(){
      return this.province;
    }

  

}
