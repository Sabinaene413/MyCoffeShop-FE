import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractApiService<DTO> {
  abstract controllerUrl:string;
  baseUrl = 'http://localhost:7015/api/';
  constructor(public http: HttpClient, private jwt: JwtHelperService) {}

   public initUrl(controllerUrl: string) {
    this.baseUrl += controllerUrl;
  }

  getAll(): Observable<DTO[]> {
    return this.http.post<DTO[]>(this.baseUrl + '/Filter', {});
  }

  addFormData(DTO: FormData): Observable<DTO> {
    return this.http.post<DTO>(this.baseUrl + '/Create', DTO, {});
  }

  updateFormData(DTO: FormData): Observable<DTO> {
    return this.http.put<DTO>(this.baseUrl + '/Update', DTO, {});
  }

  add(DTO: DTO): Observable<DTO> {
    return this.http.post<DTO>(this.baseUrl + '/Create', DTO, {});
  }

  update(DTO: DTO): Observable<DTO> {
    return this.http.put<DTO>(this.baseUrl + '/Update', DTO, {});
  }

  getById(Id: number): Observable<DTO> {
    return this.http.post<DTO>(this.baseUrl + '/GetById', { Id: Id }, {});
  }
}
