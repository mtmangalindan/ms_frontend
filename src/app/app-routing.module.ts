import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '',component: ProductlistComponent },
  { path: 'productpage',component: ProductpageComponent },
  { path: 'productlist',component: ProductlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout',component: CheckoutComponent },
  { path: 'customerinfo',component:CustomerInfoComponent },
  { path: 'payment',component:PaymentComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
