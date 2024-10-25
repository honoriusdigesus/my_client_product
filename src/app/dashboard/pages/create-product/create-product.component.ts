import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LoginService} from '../../../auth/services/login.service';
import {ProductService} from '../../services/product.service';
import {catchError, tap, throwError} from 'rxjs';
import Swal, {SweetAlertIcon} from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export default class CreateProductComponent {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  public fromCreateProduct = this.formBuilder.group({
    productName: ['', [Validators.required]],
    price: ['0', [Validators.required]],
    createdBy: [this.loginService.currentUser()?.userId, [Validators.required]],
  });

  //Create product
  createProduct() {
    console.log('Creating product');
    //Leo los valores del formulario y los mapeo en productRequest
    const productName = this.fromCreateProduct.get('productName')?.value ?? '';
    const price = this.fromCreateProduct.get('price')?.value ?? 0;
    const createdBy = this.fromCreateProduct.get('createdBy')?.value ?? 0;
    const productRequest = {
      productName: productName,
      price: Number(price),
      createdBy: createdBy
    }
    //Llamo al servicio para crear el producto
    this.productService.createProduct(productRequest).subscribe(
      (response) => {
        this.showMessage('Success', 'Product created', 'success');
        this.router.navigate(['/dashboard/products']);
      },
      (error) => {
        this.showMessage('Error', error, 'error');
      }
    );
  }

  constructor() {
    //Inicializo el formulario con los valores por defecto
    this.fromCreateProduct.setValue({
      productName: '',
      price: '0',
      createdBy: this.loginService.currentUser()?.userId
    });
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
