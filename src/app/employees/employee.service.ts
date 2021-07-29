import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from "rxjs/operators";


@Injectable()
export class EmployeeService {
    baseUrl = 'http://localhost:3000/employees';
    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    constructor(private httpClient: HttpClient) {
    }

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user        
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');

    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseUrl, employee,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }


}