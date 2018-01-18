import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MembersService extends NetworkService {

  constructor(protected http: HttpClient) {
    super(http);
  }

}
