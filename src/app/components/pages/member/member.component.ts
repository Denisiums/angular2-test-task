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
    skills: []
  };

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.departmentId = params['departmentId'];
    });

    this.route.params.subscribe( params => {
      this.memberId = params['memberId'];
      this.getMember()
        .then((member: Member) => {
          this.formMember = Member.fromFrontend(this.currentMember);
          console.log('this.formMember: ', this.formMember);
        });
    });
  }

  public get canEditSkills(): boolean {
    return !this.shouldLoadTeamleader;
  }

  public get canEdit(): boolean {
    return !this.shouldLoadTeamleader;
  }

  public save(): void {
    // todo: save
    console.log('save need');
    // send add data to backend
  }

  public undo(): void {
    // todo: undo
    console.log('undo need');
    this.resetFormMember();
  }

  public addSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    console.log('addSkill');
    this.formMember.addSkill(skill);
  }

  public changeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    console.log('changeSkill');
    this.formMember.setSkill(skill);
    console.log(this.formMember);
  }

  public removeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    console.log('removeSkill');
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
        return Member.fromFrontend(this.emptyMemberData);
      })
      .then((member: Member) => {
        this.pending.member = false;
        return member;
      });
  }

  private resetFormMember(): void {
    console.log('resetMember call');
    this.formMember = Member.fromFrontend(this.currentMember);

    console.log('this.formMember: ', this.formMember);
  }

  private get shouldLoadTeamleader(): boolean {
    const urlArray = this.location.path().split('/');
    return urlArray[urlArray.length - 2] === 'departments';
  }
}
