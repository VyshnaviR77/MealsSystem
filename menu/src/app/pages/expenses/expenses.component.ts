import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {

  expenses: any[] = [];

  expenseData = {
    title: '',
    amount: 0,
    date: ''
  };

  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  totalExpense = 0;
  constructor(private api:ApiService){}

 ngOnInit(): void {
    this.getExpenses();
    this.getSummary();
  }

   addExpense() {

    this.api.addExpense(this.expenseData).subscribe({
      next: () => {

        alert('Expense Added Successfully');

        this.expenseData = {
          title: '',
          amount: 0,
          date: ''
        };

        this.getExpenses();
        this.getSummary();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

 getExpenses() {

    this.api.getExpenses().subscribe({
      next: (res: any) => {

        this.expenses = res;
        console.log(this.expenses);
        

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  getSummary() {

    this.api.getExpenseSummary(
      this.month,
      this.year
    ).subscribe({
      next: (res: any) => {

        this.totalExpense = res.totalExpense;
        console.log(this.totalExpense);
        

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
