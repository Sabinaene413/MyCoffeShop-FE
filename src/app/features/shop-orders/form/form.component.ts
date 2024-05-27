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
  templateUrl: './form.component.html',
})
export class ShopOrderFormComponent
  extends BaseFormComponent<ShopOrder>
  implements OnInit
{
  responseMsg: string = '';
  productForm!: FormGroup;
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

  override initializeFormGroup(data: ShopOrder | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id],
      supplier: [data?.supplier ?? ''],
      arrivalDate: [this.convertToDate(data?.arrivalDate?.toString() ?? '') ?? ''],
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
    return this.productForm?.get('shopOrderProducts') as FormArray;
  }

  addProduct(productAdded: ShopProductOrder | undefined = undefined) {
    let product = this.formBuilder.group({
      id: [productAdded?.id ?? null],
      shopOrderId: [productAdded?.shopOrderId ?? null],
      shopProductId: [productAdded?.shopProductId ?? '', Validators.required],
      price: [productAdded?.price ?? null, Validators.required],
      quantity: [productAdded?.quantity ?? null, Validators.required],
      cost: [''],
    });

      // Set up a subscription to adjust price based on selected product
      product.get('shopProductId')?.valueChanges.subscribe((selectedProductId: any) => {
        const selectedProduct = this.productOptions.find(product => product.id == (selectedProductId as number));
        if (selectedProduct) {
          product.get('price')?.setValue(selectedProduct.price);
        }
      });

    this.shopOrderProducts.push(product);
  }

  deleteProduct(index: number) {
    this.shopOrderProducts.removeAt(index);
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.shopOrderProducts?.value.forEach((product: any) => {
      if (product?.price !== null && product?.quantity !== null) {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity);
        totalCost += price * quantity;
      }
    });
    return totalCost;
  }

  override afterSave() {
    this.router.navigate(['/shop-orders']);
  }

  override async mapToSaveData() {
    let mappedProducts: ShopProductOrder[] = this.shopOrderProducts.value.map(
      (product: any) => {
        return {
          id: product.id,
          shopOrderId: product.shopOrderId,
          shopProductId: product.shopProductId,
          price: product.price as number,
          quantity: product.quantity,
          cost: (product.price as number) * (product.quantity as number),
        };
      }
    );

    let orderData: ShopOrder = {
      id: this.formGroup.get('id')?.value,
      supplier: this.formGroup.get('supplier')?.value,
      arrivalDate: this.formGroup.get('arrivalDate')?.value,
      orderDate: new Date(),
      received: false,
      cost: this.calculateTotalCost(),
      shopOrderProducts: mappedProducts,
    };

    this.saveData = orderData;
  }
}
