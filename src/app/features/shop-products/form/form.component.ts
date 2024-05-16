import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiShopProductService } from '../api.service.shop-products';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';

@Component({
  selector: 'app-shopProduct',
  templateUrl: './form.component.html',
})
export class ShopProductFormComponent implements OnInit {
  shopProductForm!: FormGroup;
  responseMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiShopProductService,
    private router: Router
  ) {
    this.shopProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  addProduct() {
    let productData: ShopProduct = {
      name: this.shopProductForm.get('name')?.value,
      price: this.shopProductForm.get('price')?.value,
      description: this.shopProductForm.get('description')?.value,
    };

    this.api.add(productData).subscribe((response) => {
      console.log('Product added successfully:', response);
    });
  }
}
