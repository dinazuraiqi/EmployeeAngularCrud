import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  error: any;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _route: ActivatedRoute) {
    const resolvedEmployeeList: ResolvedEmployeeList
      = this._route.snapshot.data['employeeList'];

    if (resolvedEmployeeList.error == null) {
      this.employees = resolvedEmployeeList.employeeList;
    } else {
      this.error = resolvedEmployeeList.error;
    }

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

}
