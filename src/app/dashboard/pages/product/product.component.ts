import {Component, inject} from '@angular/core';
import {ProductResponse} from '../../interfaces/product.interface';
import {SearchBoxComponent} from '../../shared/search-box/search-box.component';
import {ProductService} from '../../services/product.service';
import {CurrencyPipe, DatePipe, JsonPipe} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SearchBoxComponent, JsonPipe, CurrencyPipe, DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {

  productName: ProductResponse = {
    productId: 0, productName: '', price: 0, createdBy: 0, createdAt: new Date()
  };
  public products: ProductResponse[] = [];
  private productService = inject(ProductService);

  constructor() {
    this.getAllProducts();
  }

  getProductByName(productName: string) {
    console.log('Getting product by name:', productName);
    return this.productService.searchProduct(productName)
      .subscribe(product => {
        this.productName = product;
      });
  }

  getAllProducts() {
    console.log('Getting all products');
    return this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  // deleteProductByName(nameProduct: string) {
  //   console.log('Deleting product by name:', nameProduct);
  //   return this.productService.deleteProduct(nameProduct)
  //     .subscribe(product => {
  //       this.productName = product;
  //     });
  // }


  deleteProductByName(nameProduct: string) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminando producto por nombre:', nameProduct);
        this.productService.deleteProduct(nameProduct)
          .subscribe(
            product => {
              this.productName = product;
              Swal.fire({
                title: "¡Eliminado!",
                text: "Su archivo ha sido eliminado.",
                icon: "success"
              });
            },
            error => {
              // Manejo de errores si es necesario
              Swal.fire({
                title: "Error!",
                text: "Se produjo un error al eliminar el producto.",
                icon: "error"
              });
            }
          );
      }
      this.getAllProducts();
    });
  }

}
