import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { MealsComponent } from './pages/meals/meals.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PaymentsComponent } from './pages/payments/payments.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: 'users/add',
    component: UserFormComponent
  },

  {
    path: 'users/edit/:id',
    component: UserFormComponent
  },

  {
    path: 'meals',
    component: MealsComponent
  },

  {
    path: 'expenses',
    component: ExpensesComponent
  },

  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
  

];