import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Employee } from './employee-models';

@Injectable({
  providedIn: 'root',
})
export class ApiEmployeeService {
  baseUrl = 'http://localhost:7015/api/Employee';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.baseUrl + '/Filter', {});
  }

  saveEmployee(Employee: FormData): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + '/Create', Employee, {
    });
  }
}
