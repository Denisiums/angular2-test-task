import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import 'rxjs/add/operator/toPromise';

import { IDepartment, IDepartmentShort, IMemberShort } from '../interfaces';

@Injectable()
export class DepartmentsService extends NetworkService {
  private baseUrl: string = '/company/departments';

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getDepartmentsList(): Promise<IDepartmentShort[]> {
    const url: string = this.apiUrl + this.baseUrl;
    return this.http.get(url)
      .toPromise()
      .then((departmentsList: IDepartmentShort[]) => {
        return departmentsList;
      })
      .catch(this.handleError);
  }

  public getDepartment(id: number): Promise<IDepartment> {
    if (!id) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.apiUrl}${this.baseUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((department: IDepartment) => {
        return department;
      })
      .catch(this.handleError);
  }
}
