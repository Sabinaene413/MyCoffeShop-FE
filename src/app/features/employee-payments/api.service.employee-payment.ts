import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { EmployeePayment } from './employee-payment-models';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeePaymentService extends AbstractApiService<EmployeePayment> {
  controllerUrl = 'EmployeePayment';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}
