import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CompaniesService } from '../../../services/companies.service';
import { DepartmentsService } from '../../../services/departments.service';
import { MembersService } from '../../../services/members.service';
import { SharedService } from '../../../services/shared.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillEditorComponent } from '../../elements/skill-editor/skill-editor.component';
import { MemberComponent } from './member.component';

describe('MemberComponent', () => {
  let component: MemberComponent;
  let fixture: ComponentFixture<MemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberComponent, SkillEditorComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: CompaniesService, useValue: {}},
        {provide: DepartmentsService, useValue: {}},
        {provide: MembersService, useValue: {}},
        {provide: SharedService, useValue: {}},
      ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
