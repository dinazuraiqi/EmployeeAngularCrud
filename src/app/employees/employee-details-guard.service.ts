import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class EmployeeDetailsGuardService implements CanActivate {
    constructor(private _employeeService: EmployeeService,
        private _router: Router) { }

    // Return true if navigation is allowed, otherwise false
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployee(+route.paramMap.get('id'))
            .pipe(
                map(employee => {
                    const employeeExists = !!employee;

                    if (employeeExists) {
                        return true;
                    } else {
                        this._router.navigate(['notfound']);
                        return false;
                    }
                }),
                catchError((err) => {
                    console.log(err);
                    return of(false);
                })
            );
    }
}