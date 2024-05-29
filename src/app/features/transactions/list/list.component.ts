import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../transaction-models';
import { ApiTransactionService } from '../api.service.transactions';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
})
export class TranscationsListComponent extends BaseListComponent<Transaction> implements OnInit {
  @ViewChild('grid') grid: any;

  constructor(api: ApiTransactionService) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
