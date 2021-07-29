import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-gaurd.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employees/:id',
     component: EmployeeDetailsComponent,
     canActivate: [EmployeeDetailsGuardService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
