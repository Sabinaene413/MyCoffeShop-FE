import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { DashboardDto, DashboardFakeDto, ReportRequestDto, ShopSalesDto } from './dashboard-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDashboardService extends AbstractApiService<DashboardFakeDto> {
  controllerUrl = 'Report';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }

  shopSales(request: ReportRequestDto): Observable<ShopSalesDto[]> {
    return this.http.put<ShopSalesDto[]>(this.baseUrl + '/ShopSales', request);
  }

  getDashboardInitialData(): Observable<DashboardDto> {
    return this.http.put<DashboardDto>(this.baseUrl + '/DashboardInitial', { });
  }
}
