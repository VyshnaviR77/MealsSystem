import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    server_url = 'http://localhost:9000';
    // http://localhost:9000
    // https://mealssystem.onrender.com


  constructor(private http:HttpClient) { }
  getUsers() {
    return this.http.get(`${this.server_url}/getuser`);
  }

  addUser(data: any) {
    return this.http.post(`${this.server_url}/adduser`, data);
  }
getUserById(id: string) {
  return this.http.get(`${this.server_url}/getuser/${id}`);
}
  updateUser(id: string, data: any) {
    return this.http.put(`${this.server_url}/update/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.server_url}/delete/${id}`);
  }

  // meals
   getMeals() {
    return this.http.get(`${this.server_url}/getmeal`);
  }

  addMeal(data: any) {
    return this.http.post(`${this.server_url}/addmeal`, data);
  }

  getMonthlyMeals(userId: string, month: number, year: number) {
    return this.http.get(
      `${this.server_url}/monthly/${userId}/${month}/${year}`
    );
  }


  // expense
  getExpenses() {
    return this.http.get(`${this.server_url}/expense`);
  }

  addExpense(data: any) {
    return this.http.post(`${this.server_url}/addexpense`, data);
  }

  getExpenseSummary(month: number, year: number) {
    return this.http.get(
      `${this.server_url}/summary/${month}/${year}`
    );
  }

  // report
   getMonthlyReport(month: number, year: number) {
    return this.http.get(
      `${this.server_url}/report/${month}/${year}`
    );
  }
}
