import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: any[] = [];

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.api.getUsers().subscribe({
      next: (res: any) => {
        console.log('Users:', res);
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: string) {
    if (!confirm('Delete this user?')) {
      return;
    }

    this.api.deleteUser(id).subscribe({
      next: () => {
        alert('User Deleted Successfully');
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
