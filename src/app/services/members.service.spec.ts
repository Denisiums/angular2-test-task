import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { MembersService } from './members.service';

describe('MembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([MembersService], (service: MembersService) => {
    expect(service).toBeTruthy();
  }));
});
