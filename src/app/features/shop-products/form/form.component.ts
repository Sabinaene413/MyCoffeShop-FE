import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiShopProductService } from '../api.service.shop-products';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { BaseFormComponent } from 'src/app/shared/base-form';

@Component({
  selector: 'app-shopProduct',
  templateUrl: './form.component.html',
})
export class ShopProductFormComponent
  extends BaseFormComponent<ShopProduct>
  implements OnInit
{
  responseMsg: string = '';

  constructor(
    public override api: ApiShopProductService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initializeFormGroup(data: ShopProduct | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id, [Validators.required]],
      name: [data?.name ?? '', [Validators.required]],
      price: [data?.price ?? '', [Validators.required]],
      description: [data?.description ?? ''],
    });
  }

  override afterSave() {
    this.router.navigate(['/shop-products']);
  }
}
