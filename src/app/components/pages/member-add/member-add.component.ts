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
  private newMember: Member;
  public memberForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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

}
