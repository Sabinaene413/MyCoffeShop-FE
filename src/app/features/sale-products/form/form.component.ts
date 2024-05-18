import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSaleProductService } from '../api.service.sale-products';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';
import { BaseFormComponent } from 'src/app/shared/base-form';

@Component({
  selector: 'app-saleProduct',
  templateUrl: './form.component.html',
})
export class SaleProductFormComponent
  extends BaseFormComponent<SaleProduct>
  implements OnInit
{
  responseMsg: string = '';

  constructor(
    public override api: ApiSaleProductService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override initializeFormGroup(data: SaleProduct | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id, [Validators.required]],
      name: [data?.name ?? '', [Validators.required]],
      price: [data?.price ?? '', [Validators.required]],
      description: [data?.description ?? ''],
    });
  }

  override afterSave() {
    this.router.navigate(['/sale-products']);
  }
}
