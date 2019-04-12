import { Component, OnInit, enableProdMode } from '@angular/core';
import { Product } from './productlist/productlist.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit() {

  
  }
}
