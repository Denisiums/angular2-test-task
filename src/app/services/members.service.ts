import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import { HelpersService } from './helpers.service';
import 'rxjs/add/operator/toPromise';

import { IMember, IMemberBackend, IMemberShort } from '../interfaces';
import { Member } from '../models';

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
        return membersList.sort((a, b) => HelpersService.compareStrings(a.name, b.name));
      })
      .catch(this.handleError);
  }

  public getDepartmentMember(departmentId: string, memberId: string): Promise<Member> {
    if (!departmentId || !memberId) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}/${memberId}`;
    return this.http.get(url)
      .toPromise()
      .then((memberData: IMemberBackend) => {
        return Member.fromBackend(memberData);
      })
      .catch(this.handleError);
  }

  private getBaseUrl(departmentId: string) {
    return `${this.apiUrl}/company/departments/${departmentId}/members`;
  }



}
