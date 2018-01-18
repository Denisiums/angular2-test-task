import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';

@Injectable()
export class DepartmentsService extends NetworkService {

  constructor(protected http: HttpClient) {
    super(http);
  }

}
