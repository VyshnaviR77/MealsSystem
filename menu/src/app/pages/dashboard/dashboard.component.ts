import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 totalResidents = 0;
  totalMeals = 0;
  totalExpense = 0;
  costPerMeal = 0;

currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  chart: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {

    this.loadResidents();
    this.loadReport();

  }
  loadResidents() {

    this.api.getUsers().subscribe({
      next: (res: any) => {

        this.totalResidents = res.length;

        this.createChart();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  loadReport() {

    this.api.getMonthlyReport(
      this.currentMonth,
      this.currentYear
    ).subscribe({
      next: (res: any) => {

        this.totalMeals = res.grandTotalMeals;
        this.totalExpense = res.totalExpense;
        this.costPerMeal = Number(res.costPerMeal.toFixed(2));

        this.createChart();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  createChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('dashboardChart', {

      type: 'bar',

      data: {
        labels: [
          'Residents',
          'Meals',
          'Expense',
          'Cost/Meal'
        ],

        datasets: [
          {
            label: 'Monthly Statistics',
            data: [
              this.totalResidents,
              this.totalMeals,
              this.totalExpense,
              this.costPerMeal
            ]
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    });

  }

}
