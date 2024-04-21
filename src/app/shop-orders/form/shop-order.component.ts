import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiShopOrderService } from '../api.service.shop-orders';


@Component({
  selector: 'app-shopOrder',
  templateUrl: './shop-order.component.html',
})
export class ShopOrderFormComponent {
  hide = true;
  shopOrderForm: FormGroup;
  responseMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiShopOrderService ,
    private router: Router
  ) {
    this.shopOrderForm = this.formBuilder.group({
      supplier: ['', [Validators.required]],
      arrivalDate: ['']
    });
  }

  shopOrder() {
    let shopOrderInfo = {
      supplier: this.shopOrderForm.get('supplier')?.value,
      arrivalDate: this.shopOrderForm.get('arrivalDate')?.value,
    };
  }

}
