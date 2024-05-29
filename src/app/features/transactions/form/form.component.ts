import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base-form';
import { ApiTransactionService } from '../api.service.transactions';
import { Transaction } from '../transaction-models';

@Component({
  selector: 'app-transaction',
  templateUrl: './form.component.html',
})
export class TransactionFormComponent
  extends BaseFormComponent<Transaction>
  implements OnInit
{
  responseMsg: string = '';
  transactionTypeOptions: any[] = [
    { id: 1, name: 'CUMPARARE' },
    { id: 2, name: 'VANZARE' },
    { id: 3, name: 'PLATA' },
  ];

  constructor(
    public override api: ApiTransactionService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override initializeFormGroup(data: Transaction | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id],
      transactionTypeId: [data?.transactionTypeId ?? '', [Validators.required]],
      description: [data?.description ?? '', [Validators.required]],
      totalAmount: [data?.totalAmount ?? '', [Validators.required]],
      transactionDate: [
        this.convertToDate(
          data?.transactionDate.toString() ?? new Date().toString()
        ),
        [Validators.required],
      ],
    });
  }

  override afterSave() {
    this.router.navigate(['/transactions']);
  }
}
