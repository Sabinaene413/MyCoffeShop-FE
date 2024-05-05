import { Component } from '@angular/core';
import { ApiUserService } from '../../services/api.service';
import { User } from './users-models';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  constructor(private api: ApiUserService) {}

  ngOnInit(): void {
    this.api.getAllUsers(1, 15).subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}
