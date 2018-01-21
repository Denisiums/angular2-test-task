import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService } from '../../../services';
import { IMember, ISkill } from '../../../interfaces';
import { Member } from '../../../models';

interface IAddMemberPagePending {
  member: boolean;
}

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  public newMember: Member;
  public memberForm: FormGroup;
  public formError: string = '';
  private departmentId: string;
  public pending: IAddMemberPagePending = {
    member: false
  };

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.departmentId = params['departmentId'];
    });

    this.newMember = Member.fromFrontend({
      name: '',
      description: '',
      gender: 'M',
      job: '',
      skills: []
    });

    this.memberForm = this.fb.group({
      name: [this.newMember.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.newMember.description, [Validators.required, Validators.maxLength(255)]],
      gender: [this.newMember.gender, [Validators.required, Validators.maxLength(1)]],
      job: [this.newMember.job, [Validators.required, Validators.maxLength(100)]],
    });
  }

  public get skillsValid(): boolean {
    return !!(this.newMember && this.newMember.skillsValid);
  }

  public addSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.newMember.addSkill(skill);
  }

  public changeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.newMember.setSkill(skill);
  }

  public removeSkill(skill: ISkill): void {
    if (!skill) {
      return;
    }

    this.newMember.removeSkill(skill);
  }

  public create(): void {
    if (!this.newMember || !this.skillsValid || !this.memberForm.valid || !this.departmentId || this.pending.member) {
      return;
    }

    const member: Member = this.compileMember();
    const departmentId: string = this.departmentId;
    this.pending.member = true;
    this.membersService.createDepartmentMember(departmentId, member)
      .then(response => {
        // todo: there should be navigationg to new member page, but backend is only mocks
        this.router.navigate(['departments', this.departmentId]);
        return true;
      })
      .catch(err => {
        this.formError = err.message;
        return false;
      })
      .then(() => {
        this.pending.member = false;
      });
  }

  private compileMember(): Member {
    if (!this.newMember || !this.skillsValid || !this.memberForm.valid) {
      return;
    }

    this.newMember.name = this.memberForm.get('name').value.trim();
    this.newMember.description = this.memberForm.get('description').value.trim();
    this.newMember.job = this.memberForm.get('job').value.trim();
    this.newMember.gender = this.memberForm.get('gender').value;
    return this.newMember;
  }

}
