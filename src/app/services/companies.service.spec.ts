import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([CompaniesService], (service: CompaniesService) => {
    expect(service).toBeTruthy();
  }));
});
