import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUserService } from '../../services/api.service';
import { User } from './users-models';
import { BaseListComponent } from 'src/app/shared/base-list';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends BaseListComponent<User> implements OnInit {
  @ViewChild('grid') grid: any;

  constructor(api: ApiUserService) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();
  }

  
}


