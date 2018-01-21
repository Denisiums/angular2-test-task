import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentsService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([DepartmentsService], (service: DepartmentsService) => {
    expect(service).toBeTruthy();
  }));
});
