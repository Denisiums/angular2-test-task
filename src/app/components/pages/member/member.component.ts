import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MembersService, SharedService } from '../../../services';
import { IMember, ISkill } from '../../../interfaces';
import { Member } from '../../../models';

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

  public formMember: Member = null;
  public pending: IMemberPagePending = {
    member: false
  };
  public networkError: boolean = false;

  private currentMember: Member = null;
  private departmentId: string;
  private memberId: string;
  private readonly emptyMemberData: IMember = {
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
        .then((member: Member) => {
          this.formMember = Object.assign({}, member);
          Object.setPrototypeOf(this.formMember, Member.prototype);
          console.log('this.formMember: ', this.formMember);
        });
    });
  }

  public resetMember(): void {
    this.formMember = Object.assign({}, this.currentMember);
    Object.setPrototypeOf(this.formMember, Member.prototype);
  }

  public get canEditSkills(): boolean {
    return this.shouldLoadTeamleader;
  }

  public addSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.formMember.addSkill(skill);
  }

  public save(): void {
    // todo: save
    console.log('save need');
  }

  public undo(): void {
    // todo: undo
    console.log('undo need');
  }

  public removeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.formMember.removeSkill(skill);
  }

  private getMember(): Promise<Member> {
    if (!this.departmentId) {
      return Promise.reject(new Error('Unable to get member: no department id'));
    }

    this.networkError = false;
    if (this.shouldLoadTeamleader) {
      const teamLeader: Member = this.sharedService.teamLeader;
      this.currentMember = teamLeader;
      // or create empty form
      return Promise.resolve(teamLeader);
    }

    const departmentId: string = this.departmentId;
    const memberId: string = this.memberId;
    console.log('departmentId: ', departmentId);
    console.log('memberId: ', memberId);
    return this.membersService.getDepartmentMember(departmentId, memberId)
      .then((member: Member) => {
        console.log('received member: ', member);
        this.currentMember = member;
        return member;
      })
      .catch((err: Error) => {
        console.log('received member error: ', err);
        this.networkError = true;
        return new Member(this.emptyMemberData);
      })
      .then((member: Member) => {
        this.pending.member = false;
        return member;
      });
  }

  private get shouldLoadTeamleader(): boolean {
    const urlArray = this.location.path().split('/');
    return urlArray[urlArray.length - 2] === 'departments';
  }
}
