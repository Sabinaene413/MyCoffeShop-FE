import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../Models/models';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllUsers(1, 15).subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}
