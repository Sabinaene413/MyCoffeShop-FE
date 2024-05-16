import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Employee } from './employee-models';
import { AbstractApiService } from 'src/app/shared/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeeService extends AbstractApiService<Employee> {
  controllerUrl = 'Employee';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }

}
