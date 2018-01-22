import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { NetworkService } from './network.service';
import { HelpersService } from './helpers.service';
import 'rxjs/add/operator/toPromise';

import { IMember, IMemberBackend, IMemberShort, ISkill, ISkillsBackend } from '../interfaces';
import { Member } from '../models';

interface IBackendResponse {
  status: string;
}

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

  public updateDepartmentMemberSkills(departmentId: string, memberId: string, skills: ISkill[]): Promise<boolean> {
    if (!departmentId || !memberId || !skills || !skills.length) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}/${memberId}/skills`;
    const skillsData: ISkillsBackend = Member.skillsArrayToObject(skills);
    return this.http.put(url, skillsData)
      .toPromise()
      .then((response: IBackendResponse) => {
        return true;
      })
      .catch(this.handleError);
  }

  public addDepartmentMemberSkills(departmentId: string, memberId: string, skills: ISkill[]): Promise<boolean> {
    if (!departmentId || !memberId || !skills || !skills.length) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}/${memberId}/skills`;
    const skillsDataList: ISkillsBackend[] = skills.map((skill: ISkill) => Member.skillToBackendObject(skill));
    if (!skillsDataList.length) {
      return Promise.resolve(true);
    }

    return Promise.all(
      skillsDataList.map((skillData: ISkillsBackend) => {
        return this.http.post(url, skillData)
          .toPromise()
          .then((response: IBackendResponse) => {
            return response;
          })
          .catch(this.handleError);
      })
    ).then(response => {
      return true;
    }).catch(err => {
      return false;
    });
  }

  public removeDepartmentMemberSkills(departmentId: string, memberId: string, skills: ISkill[]): Promise<boolean> {
    if (!departmentId || !memberId || !skills || !skills.length) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}/${memberId}/skills`;
    const skillsDataList: ISkillsBackend[] = skills.map((skill: ISkill) => Member.skillToBackendObject(skill));
    if (!skillsDataList.length) {
      return Promise.resolve(true);
    }

    return Promise.all(
      skillsDataList.map((skillData: ISkillsBackend) => {
        // to pass body to DELETE
        return this.http.request('delete', url, {
          body: skillData
        }).toPromise()
          .then((response: IBackendResponse) => {
            return response;
          })
          .catch(this.handleError);
      })
    ).then(response => {
      return true;
    }).catch(err => {
      return false;
    });
  }

  public createDepartmentMember(departmentId: string, member: Member): Promise<boolean> {
    if (!departmentId || !member) {
      return Promise.reject(new Error('API call invalid arguments'));
    }

    const url: string = `${this.getBaseUrl(departmentId)}`;
    const skillsData: IMemberBackend = {
      name: member.name,
      gender: member.gender,
      job: member.job,
      description: member.description,
      skills: Member.skillsArrayToObject(member.skills)
    };

    return this.http.post(url, skillsData)
      .toPromise()
      .then((response: IBackendResponse) => {
        return true;
      })
      .catch(this.handleError);

  }

  private getBaseUrl(departmentId: string) {
    return `${this.apiUrl}/company/departments/${departmentId}/members`;
  }



}
