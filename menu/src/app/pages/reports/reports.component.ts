import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
    month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  reportType = 'monthly';

  report: any = null;

  constructor(private api:ApiService){}

   getReport() {

    if (this.reportType === 'monthly') {

      this.api.getMonthlyReport(
        this.month,
        this.year
      ).subscribe({
        next: (res: any) => {
          this.report = res;
        },
        error: (err) => {
          console.log(err);
        }
      });

    }

    else {

      this.api.getYearlyReport(
        this.year
      ).subscribe({
        next: (res: any) => {
          this.report = res;
        },
        error: (err) => {
          console.log(err);
        }
      });

    }

  }



}
