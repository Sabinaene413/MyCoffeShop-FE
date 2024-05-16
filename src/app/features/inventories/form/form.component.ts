import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInventoryService } from '../api.service.inventories';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';
import { Inventory } from 'src/app/features/inventories/inventory-models';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';

@Component({
  selector: 'app-inventory',
  templateUrl: './form.component.html',
})
export class InventoryFormComponent implements OnInit {
  inventoryForm!: FormGroup;
  productForm!: FormGroup;
  responseMsg: string = '';
  totalCost: number = 0;
  productOptions: ShopProduct[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiInventoryService,
    private apiProducts: ApiShopProductService,
    private router: Router
  ) {
    this.inventoryForm = this.formBuilder.group({
      shopProductId: ['', [Validators.required]],
      quantity: [''],
      description: [''],
      minimumLevel: [''],
    });
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });

    this.apiProducts.getAll().subscribe((data: any) => {
      this.productOptions = data;
    });
  }

  ngOnInit(): void {}
  get products() {
    return this.productForm.get('products') as FormArray;
  }

  addInventory() {
    let inventoryData: Inventory = {
      description: this.inventoryForm.get('description')?.value,
      minimumLevel: this.inventoryForm.get('minimumLevel')?.value,
      quantity: this.inventoryForm.get('quantity')?.value,
      shopProductId: this.inventoryForm.get('shopProductId')?.value,
    };

    this.api.saveInventory(inventoryData).subscribe((response) => {
      console.log('Inventory added successfully:', response);
      this.router.navigate(['/inventories']); 
    });
  }
}
