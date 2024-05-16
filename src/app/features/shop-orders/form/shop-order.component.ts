import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiShopOrderService } from '../api.service.shop-orders';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { ShopOrder, ShopProductOrder } from '../shop-order-models';
import { BaseFormComponent } from 'src/app/shared/base-form';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';

@Component({
  selector: 'app-shopOrder',
  templateUrl: './shop-order.component.html',
})
export class ShopOrderFormComponent
  extends BaseFormComponent<ShopOrder>
  implements OnInit
{
  responseMsg: string = '';
  productForm!: FormGroup;
  totalCost: number = 0;
  productOptions: ShopProduct[] = [];

  constructor(
    public override api: ApiShopOrderService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiProduct: ApiShopProductService
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    this.apiProduct.getAll().subscribe((data: any) => {
      this.productOptions = data;
    });

    super.ngOnInit();
  }

  initializeFormGroup(data: ShopOrder | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id, [Validators.required]],
      supplier: [data?.supplier ?? '', [Validators.required]],
      arrivalDate: [data?.arrivalDate ?? ''],
      cost: [data?.cost ?? ''],
    });

    this.productForm = this.formBuilder.group({
      shopOrderProducts: this.formBuilder.array([]),
    });
    if (data?.shopOrderProducts) {
      data.shopOrderProducts.forEach((product: ShopProductOrder) => {
        this.addProduct(product);
      });
      this.calculateTotalCost();
    }
  }

  get shopOrderProducts() {
    return this.productForm.get('shopOrderProducts') as FormArray;
  }

  addProduct(productAdded: ShopProductOrder | undefined = undefined) {
    let product = this.formBuilder.group({
      id: [productAdded?.shopOrderId ?? null],
      shopOrderId: [productAdded?.shopOrderId ?? null, Validators.required],
      shopProductId: [productAdded?.shopProductId ?? '', Validators.required],
      price: [productAdded?.price ?? ''],
      quantity: [productAdded?.quantity ?? '', Validators.required],
      cost: ['']
    });

    this.shopOrderProducts.push(product);
  }

  deleteProduct(index: number) {
    this.shopOrderProducts.removeAt(index);
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    let totalCost = 0;
    this.shopOrderProducts.value.forEach((product: any) => {
      const price = parseFloat(product.price);
      const quantity = parseInt(product.quantity);
      totalCost += price * quantity;
    });
    this.totalCost = totalCost;
  }

  shopOrder() {
    let shopOrderInfo = {
      supplier: this.formGroup.get('supplier')?.value,
      arrivalDate: this.formGroup.get('arrivalDate')?.value,
    };
  }

  override afterSave() {
    this.router.navigate(['/shop-orders']);
  }

  override mapToSaveData() {

    const mappedProducts = this.shopOrderProducts.value.map((product: any) => {
      return {
        id: product.id,
        shopOrderId: product.shopOrderId,
        shopProductId: product.shopProductId,
        price: product.price as number,
        quantity: product.quantity,
        cost: (product.price as number) * (product.quantity as number),
      };
    });

    let orderData: any = {
      id: this.formGroup.get('id')?.value,
      supplier: this.formGroup.get('supplier')?.value,
      arrivalDate: this.formGroup.get('arrivalDate')?.value,
      orderDate: new Date(),
      received: false,
      cost: this.totalCost,
      shopOrderProducts: mappedProducts,
    };

    this.saveData = orderData;
  }

}
