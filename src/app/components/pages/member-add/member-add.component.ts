import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService, SharedService } from '../../../services';
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


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log('init form!');
    this.newMember = Member.fromFrontend({
      name: '',
      description: '',
      gender: 'M',
      job: '',
      skills: []
    });

    this.memberForm = this.fb.group({
      name: [this.newMember.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.newMember.description, [Validators.required, Validators.maxLength(255)]], // todo: select
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
    if (!this.newMember || !this.skillsValid || !this.memberForm.valid) {
      return;
    }

    const member = this.compileMember();
    console.log('member to save: ', member);

    console.log('create');
    // todo: make a request to api
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
