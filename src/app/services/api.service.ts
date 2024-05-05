import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Person, User } from '../features/users/users-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  baseUrl = 'http://localhost:7015/api';
  constructor(private http: HttpClient, private jwt: JwtHelperService) { }


  login(loginInfo: any) {
    return this.http.post(this.baseUrl + '/Authentication/Login', loginInfo, {
      responseType: 'json',
    });
  }


  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.Id,
      firstName: token.FirstName,
      lastName: token.LastName,
      email: token.Email,
    };
    return user;
  }

  getAllUsers(pageNumber: number, pageSize: number): Observable<User[]> {
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize
    };

    return this.http.post<User[]>(this.baseUrl + '/User/Filter', body);
  }

}
