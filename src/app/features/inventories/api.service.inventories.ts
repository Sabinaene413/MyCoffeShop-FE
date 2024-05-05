import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/features/inventories/inventory-models';

@Injectable({
  providedIn: 'root',
})
export class ApiInventoryService {
  baseUrl = 'http://localhost:7015/api/Inventory';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getInventories(): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(
      this.baseUrl + '/Filter',
      {}
    );
  }

  saveInventory(Inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(
      this.baseUrl + '/Create',
      Inventory
    );
  }
}
