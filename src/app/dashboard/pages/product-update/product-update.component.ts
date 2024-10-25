import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export default class ProductUpdateComponent implements OnInit{

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);

  public fromUpdateProduct = this.formBuilder.group({
    productName: ['', [Validators.required]],
    price: ['0', [Validators.required]],
    createdBy: [this.loginService.currentUser()?.userId, [Validators.required]],
  });

  constructor() {
    //Recieve the product params data from the form product
    this.fromUpdateProduct.setValue({
      productName: 'product name',
      price: '0',
      createdBy: this.loginService.currentUser()?.userId
    });

    console.log(this.loginService.currentUser()?.userId);

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productName = params.get('name') || '';
      const price = params.get('price') || '0';
      const createdBy = this.loginService.currentUser()?.userId;

      // Asignar los valores a las variables del formulario
      this.fromUpdateProduct.setValue({
        productName: productName,
        price: price,
        createdBy: createdBy
      });

      console.log('Product name:', productName);
      console.log('Price:', price);
      console.log('Created by:', createdBy);
    });
    }

}
