import {Component, computed, inject, OnInit} from '@angular/core';
import {LoginService} from '../../../auth/services/login.service';
import {Observable, of} from 'rxjs';
import {ProductResponse} from '../../interfaces/product.interface';
import {SearchBoxComponent} from '../../shared/search-box/search-box.component';
import {ProductService} from '../../services/product.service';
import {HttpHeaders} from '@angular/common/http';
import {AuthStatus} from '../../../auth/interfaces/auth-status.enum';
import {CurrencyPipe, DatePipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SearchBoxComponent,
    JsonPipe,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent{

  private productService = inject(ProductService);
  productName: ProductResponse={
    productId: 0,
    productName: '',
    price: 0,
    createdBy: 0,
    createdAt: new Date()
  };

  public products: ProductResponse[] = [];

  getProductByName(productName: string){
    console.log('Getting product by name:', productName);
    return this.productService.searchProduct(productName)
      .subscribe(
        product =>{
          this.productName = product;
        }
    );
  }

  getAllProducts(){
    console.log('Getting all products');
    return this.productService.getAllProducts()
      .subscribe(
        products =>{
          this.products = products;
        }
    );
  }

  deleteProductByName(nameProduct: string){
    console.log('Deleting product by name:', nameProduct);
    return this.productService.deleteProduct(nameProduct)
      .subscribe(
        product =>{
          this.productName = product;
        }
    );
  }



  constructor() {
    this.getAllProducts();
  }

}
