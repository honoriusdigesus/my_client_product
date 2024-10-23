import {Component, computed, inject} from '@angular/core';
import {LoginService} from '../../../auth/services/login.service';
import {Observable, of} from 'rxjs';
import {ProductResponse} from '../../interfaces/product.interface';
import {SearchBoxComponent} from '../../shared/search-box/search-box.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SearchBoxComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {

  getProductByName(productName: string){
    console.log('Getting product by name:', productName);
    return of("Este es un producto");
  }
}
