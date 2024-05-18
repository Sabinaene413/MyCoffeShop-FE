import { Component, ViewChild } from '@angular/core';
import { Transaction } from '../transaction-models';
import { ApiTransactionService } from '../api.service.transactions';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
})
export class TranscationsListComponent {
  @ViewChild('grid') grid: any;
  transactions: Transaction[] = [];
  constructor(private api: ApiTransactionService) {}

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: (res: Transaction[]) => {
        this.transactions = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}
