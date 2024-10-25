import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../../auth/services/login.service';
import {ProductService} from '../../services/product.service';
import {ProductRequest} from '../../interfaces/product-request.interface';
import Swal, {SweetAlertIcon} from 'sweetalert2'
import {routes} from '../../../app.routes';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export default class ProductUpdateComponent implements OnInit{

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  // Variable para almacenar el nombre original del producto
  private oldNameProduct: string = '';

  public fromUpdateProduct = this.formBuilder.group({
    productName: ['', [Validators.required]],
    price: ['0', [Validators.required]],
    createdBy: [this.loginService.currentUser()?.userId, [Validators.required]],
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const nameProduct = params.get('name') || ''; //Si no hay nombre, se asigna un string vacio
      const price = params.get('price') || '0'; //Si no hay precio, se asigna un string con el valor 0
      const createdBy = this.loginService.currentUser()?.userId; //Se obtiene el id del usuario logueado
      this.oldNameProduct = nameProduct; //Se asigna el nombre del producto a la variable oldNameProduct
      this.fromUpdateProduct.setValue({
        productName: nameProduct,
        price: price,
        createdBy: createdBy
      });
    });
  }

  ngOnInit(): void {

    }

  updateProduct() {

    console.log('Updating product');
    //Leo los nuevos valores del formulario y los mapeo en productRequest

    const newProductName = this.fromUpdateProduct.get('productName')?.value ?? '';
    const newPrice = this.fromUpdateProduct.get('price')?.value ?? 0;
    const createdBy = this.fromUpdateProduct.get('createdBy')?.value ?? 0;

    const productRequest:ProductRequest = {
      productName: newProductName,
      price: Number(newPrice),
      createdBy: createdBy
    };

    //Llamo al servicio de productos para actualizar el producto
    this.productService.updateProduct(this.oldNameProduct, productRequest).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.showMessage('Success', 'Product updated', 'success');
        this.router.navigateByUrl("dashboard/product");

      },
      (error) => {
        console.error('Error updating product:', error);
        this.showMessage('Error', error, 'error');
      }
    );
  }

  showMessage(title:string,errorMessage: string, myIcon:SweetAlertIcon) {
    Swal.fire({
      title:title,
      text: errorMessage,
      icon: myIcon,
      timer: 3500,
    })
  }

}
