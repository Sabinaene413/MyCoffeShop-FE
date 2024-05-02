import { Component } from '@angular/core';
import { ApiUserService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public api: ApiUserService) {}
  logOut() {
    this.api.deleteToken();
  }
}
