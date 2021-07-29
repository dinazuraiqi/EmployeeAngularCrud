import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  panelTitle: string;

  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: '-1',
    isActive: null,
    photoPath: null
  };
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  saveEmployee(empForm: NgForm): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          empForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    }
    else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          empForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    }

  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null
      };
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      this._employeeService.getEmployee(id).subscribe(
        (employee) => { this.employee = employee },
        (err: any) => console.log(err)
      );
      this.panelTitle = 'Edit Employee';
    }
  }

}
