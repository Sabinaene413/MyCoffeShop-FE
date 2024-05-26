import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInventoryService } from '../api.service.inventories';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';
import { Inventory } from 'src/app/features/inventories/inventory-models';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { BaseFormComponent } from 'src/app/shared/base-form';

@Component({
  selector: 'app-inventory',
  templateUrl: './form.component.html',
})
export class InventoryFormComponent
  extends BaseFormComponent<Inventory>
  implements OnInit
{
  inventoryForm!: FormGroup;
  productForm!: FormGroup;
  responseMsg: string = '';
  totalCost: number = 0;
  productOptions: ShopProduct[] = [];

  constructor(
    public override api: ApiInventoryService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiProducts: ApiShopProductService
  ) {
    super(api, router, route);
  }

  get products() {
    return this.productForm.get('products') as FormArray;
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }

  override initializeFormGroup(data: Inventory | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id],
      shopProductId: [data?.shopProductId ?? null, [Validators.required]],
      quantity: [data?.quantity ?? null],
      description: [data?.description ?? ''],
      minimumLevel: [data?.minimumLevel ?? ''],
    });
    this.apiProducts.getAll().subscribe((data: any) => {
      this.productOptions = data;
    });
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });

    this.apiProducts.getAll().subscribe((data: any) => {
      this.productOptions = data;
    });
  }

  override afterSave() {
    this.router.navigate(['/inventories']);
  }
}
