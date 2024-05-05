import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSaleOrderService } from '../api.service.sale-orders';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';

@Component({
  selector: 'app-saleOrder',
  templateUrl: './form.component.html',
})
export class SaleOrderFormComponent implements OnInit {
  saleOrderForm!: FormGroup;
  productForm!: FormGroup;
  responseMsg: string = '';
  totalCost: number = 0;
  productOptions: SaleProduct[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiSaleOrderService,
    private router: Router
  ) {
    this.saleOrderForm = this.formBuilder.group({
      cost: [''],
    });
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });

    this.api.getAllProducts().subscribe((data: any) => {
      this.productOptions = data;
    });
  }

  ngOnInit(): void {}
  get products() {
    return this.productForm.get('products') as FormArray;
  }

  addProduct() {
    let product = this.formBuilder.group({
      productId: ['', Validators.required],
      price: [''],
      quantity: ['', Validators.required],
    });

    product.valueChanges.subscribe((productModified: any) => {
      const selectedProduct = this.productOptions.find(
        (product) =>
          product.id?.toString() === productModified.productId.toString()
      );
      if (selectedProduct) {
        product.get('price')?.setValue(selectedProduct.price.toString());
        this.calculateTotalCost();
      }
    });

    this.products.push(product);
  }

  deleteProduct(index: number) {
    this.products.removeAt(index);
    this.calculateTotalCost();
  }

  addOrder() {
    const mappedProducts = this.products.value.map((product: any) => {
      return {
        saleProductId: product.productId,
        price: product.price as number,
        quantity: product.quantity,
        cost: (product.price as number) * (product.quantity as number),
      };
    });

    let orderData: any = {
      orderDate: new Date(),
      received: false,
      cost: this.totalCost,
      saleOrderProducts: mappedProducts,
    };

    this.api.saveOrder(orderData).subscribe((response) => {
      console.log('Order added successfully:', response);
    });
  }

  calculateTotalCost() {
    let totalCost = 0;
    this.products.value.forEach((product: any) => {
      const price = parseFloat(product.price);
      const quantity = parseInt(product.quantity);
      totalCost += price * quantity;
    });
    this.totalCost = totalCost;
  }
  saleOrder() {
    let saleOrderInfo = {
      supplier: this.saleOrderForm.get('supplier')?.value,
      arrivalDate: this.saleOrderForm.get('arrivalDate')?.value,
    };
  }
}
