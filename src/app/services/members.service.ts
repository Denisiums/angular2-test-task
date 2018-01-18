import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import 'rxjs/add/operator/toPromise';

import { IMember, IMemberShort } from '../interfaces';

@Injectable()
export class MembersService extends NetworkService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getDepartmentMembersList(departmentId: string): Promise<IMemberShort[]> {
    if (!departmentId) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = this.getBaseUrl(departmentId);
    return this.http.get(url)
      .toPromise()
      .then((membersList: IMemberShort[]) => {
        return membersList;
      })
      .catch(this.handleError);
  }

  public getDepartmentMember(departmentId: string, memberId: string): Promise<IMember> {
    if (!departmentId || !memberId) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}/${memberId}`;
    return this.http.get(url)
      .toPromise()
      .then((membersList: IMemberShort[]) => {
        return membersList;
      })
      .catch(this.handleError);
  }

  private getBaseUrl(departmentId: string) {
    return `${this.apiUrl}/department/${departmentId}/members`;
  }



}
