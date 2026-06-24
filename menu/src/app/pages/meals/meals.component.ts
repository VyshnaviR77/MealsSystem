import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {

  mealData = {
    userId: '',
    date: '',
    breakfast: 0,
    lunch: 0,
    dinner: 0
  };
  constructor(private api:ApiService,private router:Router){}
   users: any[] = [];
  
meals: any[] = [];

totalMeals = 0;

selectedMonth = new Date().getMonth() + 1;
selectedYear = new Date().getFullYear();


   ngOnInit(): void {
    this.getUsers();
  }

getMonthlyMeals() {

  if (!this.mealData.userId) {
    return;
  }

  this.api.getMonthlyMeals(
    this.mealData.userId,
    this.selectedMonth,
    this.selectedYear
  ).subscribe({
    next: (res: any) => {

      this.totalMeals = res.totalMeals;

    },
    error: (err) => {
      console.log(err);
    }
  });

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

   saveMeal() {

    this.api.addMeal(this.mealData).subscribe({
      next: (res) => {

        alert('Meal Added Successfully');

        console.log(res); 
        this.getMonthlyMeals()
         this.router.navigate(['/meals']);


      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
