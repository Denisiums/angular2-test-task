import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CompanyComponent } from './company.component';
import { CompaniesService } from '../../../services/companies.service';
import { DepartmentsService } from '../../../services/departments.service';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: CompaniesService, useValue: {}},
        {provide: DepartmentsService, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
