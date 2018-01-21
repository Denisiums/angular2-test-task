import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponent } from './department.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompaniesService } from '../../../services/companies.service';
import { DepartmentsService } from '../../../services/departments.service';
import { MembersService } from '../../../services/members.service';
import { SharedService } from '../../../services/shared.service';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: CompaniesService, useValue: {}},
        {provide: DepartmentsService, useValue: {}},
        {provide: MembersService, useValue: {}},
        {provide: SharedService, useValue: {}},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
