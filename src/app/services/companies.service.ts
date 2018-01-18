import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService } from './network.service';

@Injectable()
export class CompaniesService extends NetworkService {

  constructor(protected http: HttpClient) {
    super(http);
  }

}
