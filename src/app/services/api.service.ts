import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDto, RegisterEmployeeUser, RegisterUser, User } from '../features/users/users-models';
import { AbstractApiService } from '../shared/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService extends AbstractApiService<User> {
  controllerUrl = 'User';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }

  login(loginInfo: LoginDto) {
    return this.http.post('http://localhost:7015/api/' + '/Authentication/Login', loginInfo, {
      responseType: 'json',
    });
  }

  employeeRegister(registerInfo: RegisterEmployeeUser) {
    return this.http.post(this.baseUrl + '/EmployeeRegister', registerInfo, {
      responseType: 'json',
    });
  }

  register(registerInfo: RegisterUser) {
    return this.http.post(this.baseUrl + '/Register', registerInfo, {
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
      id: token._uid,
      firstName: token.FirstName,
      lastName: token.LastName,
      email: token.Email,
      role: token.role,
      locationId: token.LocationId,
      locationName: token.LocationName,
    };
    return user;
  }
}
