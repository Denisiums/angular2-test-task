import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CompaniesService } from '../../../services/companies.service';
import { DepartmentsService } from '../../../services/departments.service';
import { MembersService } from '../../../services/members.service';
import { SharedService } from '../../../services/shared.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberAddComponent } from './member-add.component';
import { SkillEditorComponent } from '../../elements/skill-editor/skill-editor.component';

describe('MemberAddComponent', () => {
  let component: MemberAddComponent;
  let fixture: ComponentFixture<MemberAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAddComponent, SkillEditorComponent ],
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
    fixture = TestBed.createComponent(MemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
