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
  public formError: string = '';

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
    this.formError = '';
    if (!this.formMember.skillsValid) {
      // todo: show some error
      this.formError = 'Invalid skills. Check again, please.';
      return;
    }
    // send add data to backend
    const newSkills: ISkill[] = Member.getNewSkills(this.currentMember.skills, this.formMember.skills);
    const removedSkills: ISkill[] = Member.getRemovedSkills(this.currentMember.skills, this.formMember.skills);
    const changedSkills: ISkill[] = Member.getChangedSkills(this.currentMember.skills, this.formMember.skills);
  }

  public undo(): void {
    this.resetFormMember();
  }

  public addSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.formMember.addSkill(skill);
  }

  public changeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.formMember.setSkill(skill);
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
    return this.membersService.getDepartmentMember(departmentId, memberId)
      .then((member: Member) => {
        this.currentMember = member;
        return member;
      })
      .catch((err: Error) => {
        this.networkError = true;
        return Member.fromFrontend(this.emptyMemberData);
      })
      .then((member: Member) => {
        this.pending.member = false;
        return member;
      });
  }

  private resetFormMember(): void {
    this.formMember = Member.fromFrontend(this.currentMember);
  }

  private get shouldLoadTeamleader(): boolean {
    const urlArray = this.location.path().split('/');
    return urlArray[urlArray.length - 2] === 'departments';
  }
}
