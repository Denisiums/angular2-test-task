import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([NetworkService], (service: NetworkService) => {
    expect(service).toBeTruthy();
  }));
});
