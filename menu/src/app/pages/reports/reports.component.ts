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

  report: any = null;

  constructor(private api:ApiService){}

   getReport() {

    this.api.getMonthlyReport(
      this.month,
      this.year
    ).subscribe({
      next: (res: any) => {

        this.report = res;
  console.log("REPORT RESPONSE", res);
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    });

  }



}
