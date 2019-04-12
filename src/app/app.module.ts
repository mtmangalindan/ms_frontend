import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { NavComponent } from './nav/nav.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductpageComponent,
    ProductlistComponent,
    CartComponent,
    CheckoutComponent,
    CustomerInfoComponent,
    AdminPortalComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
