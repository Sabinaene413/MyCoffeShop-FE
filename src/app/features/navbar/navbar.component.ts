import { Component } from '@angular/core';
import { ApiUserService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public api: ApiUserService,
    private router: Router
  ) {}
  logOut() {
    this.api.deleteToken();
  }
}
