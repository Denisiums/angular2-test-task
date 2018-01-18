import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import 'rxjs/add/operator/toPromise';
import { ICompany } from '../interfaces';

@Injectable()
export class CompaniesService extends NetworkService {
  private baseUrl: string = '/company';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getCompany(): Promise<ICompany> {
    const url: string = this.apiUrl + this.baseUrl;
    return this.http.get(url)
      .toPromise()
      .then((response: ICompany) => {
        return response;
      })
      .catch(this.handleError);
  }

}
