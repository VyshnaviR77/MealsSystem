import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userData = {
    name: '',
    phone: '',
    roomNumber: '',
    email: ''
  };

  emailTouched = false;
  phoneTouched = false;

  id: string = '';
  isEdit = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {

      this.isEdit = true;

      this.api.getUserById(this.id).subscribe({
        next: (res: any) => {
          this.userData = res;
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }

  isValidEmail(): boolean {
    return this.userData.email.endsWith('@gmail.com');
  }

  isValidPhone(): boolean {
    return /^\d{10}$/.test(this.userData.phone);
  }

  validateForm(): boolean {

    if (!this.userData.name.trim()) {
      alert('Please enter name');
      return false;
    }

    if (!this.isValidEmail()) {
      alert('Please enter a valid Gmail address');
      return false;
    }

    if (!this.isValidPhone()) {
      alert('Phone number must contain exactly 10 digits');
      return false;
    }

    return true;
  }

  saveUser() {

    if (!this.validateForm()) {
      return;
    }

    if (this.isEdit) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser() {

    this.api.addUser(this.userData).subscribe({
      next: () => {

        alert('User Added Successfully');

        this.userData = {
          name: '',
          phone: '',
          roomNumber: '',
          email: ''
        };

        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
        alert('Failed to add user');
      }
    });

  }

  updateUser() {

    this.api.updateUser(this.id, this.userData).subscribe({
      next: () => {

        alert('User Updated Successfully');

        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
        alert('Failed to update user');
      }
    });

  }

}