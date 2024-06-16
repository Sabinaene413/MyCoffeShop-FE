import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { DashboardDto, DashboardFakeDto, ProfitSixMonthsDto, ProfitSixMonthsRequestDto, ReportRequestDto, ShopSalesDto, TopSalesDto } from './dashboard-models';
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

  topSales(): Observable<TopSalesDto[]> {
    return this.http.get<TopSalesDto[]>(this.baseUrl + '/TopSales');
  }
  shopSales(request: ReportRequestDto): Observable<ShopSalesDto[]> {
    return this.http.put<ShopSalesDto[]>(this.baseUrl + '/ShopSales', request);
  }

  profitSixMonths(request: ProfitSixMonthsRequestDto): Observable<ProfitSixMonthsDto> {
    return this.http.put<ProfitSixMonthsDto>(this.baseUrl + '/ProfitSixMonths', request);
  }

  getDashboardInitialData(): Observable<DashboardDto> {
    return this.http.put<DashboardDto>(this.baseUrl + '/DashboardInitial', { });
  }
}
