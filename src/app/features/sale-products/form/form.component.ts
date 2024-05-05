import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSaleProductService } from '../api.service.sale-products';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';

@Component({
  selector: 'app-saleProduct',
  templateUrl: './form.component.html',
})
export class SaleProductFormComponent implements OnInit {
  saleProductForm!: FormGroup;
  responseMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiSaleProductService,
    private router: Router
  ) {
    this.saleProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  addProduct() {
    let productData: SaleProduct = {
      name: this.saleProductForm.get('name')?.value,
      price: this.saleProductForm.get('price')?.value,
      description: this.saleProductForm.get('description')?.value,
    };

    this.api.saveProduct(productData).subscribe((response) => {
      console.log('Product added successfully:', response);
    });
  }
}
