import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { Transaction } from './transaction-models';

@Injectable({
  providedIn: 'root',
})
export class ApiTransactionService extends AbstractApiService<Transaction> {
  controllerUrl = 'Transaction';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}
