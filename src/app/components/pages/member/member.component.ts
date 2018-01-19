import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService, SharedService } from '../../../services';
import { IMember } from '../../../interfaces';

interface IMemberPagePending {
  member: boolean;
}

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService) {
  }

  public currentMember: IMember = null;
  public formMember: IMember = null;
  public pending: IMemberPagePending = {
    member: false
  };
  public networkError: boolean = false;

  private departmentId: string;
  private memberId: string;
  private emptyMember: IMember = {
    name: '',
    description: '',
    gender: 'M',
    job: '',
    skills: null
  };

  ngOnInit() {
    console.log('init!');
    this.route.parent.params.subscribe(params => {
      console.log('get department id');
      this.departmentId = params['departmentId'];
    });

    this.route.params.subscribe( params => {
      this.memberId = params['memberId'];
      console.log('params changed');
      console.log('this.location.path(): ,', this.location.path());
      this.getMember()
        .then((member: IMember) => {
          this.formMember = Object.assign({}, member);
          console.log('this.formMember: ', this.formMember);
        });
    });
  }

  private getMember(): Promise<IMember> {
    if (!this.departmentId) {
      return Promise.reject(new Error('Unable to get member: no department id'));
    }

    this.networkError = false;
    if (this.shouldLoadTeamleader) {
      const teamLeader: IMember = this.sharedService.teamLeader;
      this.currentMember = teamLeader;
      // or create empty form
      return Promise.resolve(teamLeader);
    }

    if (this.shouldLoadEmptyForm) {
      const newMember: IMember = Object.assign({}, this.emptyMember);
      this.currentMember = newMember;
      return Promise.resolve(newMember);
    }

    const departmentId: string = this.departmentId;
    const memberId: string = this.memberId;
    console.log('departmentId: ', departmentId);
    console.log('memberId: ', memberId);
    return this.membersService.getDepartmentMember(departmentId, memberId)
      .then((member: IMember) => {
        console.log('received member: ', member);
        this.currentMember = member;
        return member;
      })
      .catch((err: Error) => {
        console.log('received member error: ', err);
        this.networkError = true;
        return Object.assign({}, this.emptyMember);
      })
      .then((member: IMember) => {
        this.pending.member = false;
        return member;
      });
  }

  private get shouldLoadTeamleader(): boolean {
    const urlArray = this.location.path().split('/');
    return urlArray[urlArray.length - 2] === 'departments';
  }

  private get shouldLoadEmptyForm(): boolean {
    const urlArray = this.location.path().split('/');
    return urlArray[urlArray.length - 1] === 'add';
  }

}
