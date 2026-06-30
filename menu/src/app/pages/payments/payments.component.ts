import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
   users: any[] = [];
  payments: any[] = [];

  paymentData = {
    userId: '',
    amount: 0,
    date: ''
  };

  constructor(private api:ApiService){}


   ngOnInit(): void {
    this.getUsers();
    this.getPayments();
  }

  getUsers() {

    this.api.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  getPayments() {

    this.api.getPayments().subscribe({
      next: (res: any) => {

        this.payments = res;

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  savePayment() {

    this.api.addPayment(this.paymentData).subscribe({

      next: () => {

        alert("Payment Added Successfully");

        this.paymentData = {
          userId: '',
          amount: 0,
          date: ''
        };

        this.getPayments();

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

}
