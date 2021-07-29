import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  confirmDelete = false;
  selectedEmployeeId: number;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }

}
