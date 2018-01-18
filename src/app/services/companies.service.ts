import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService } from './network.service';
import { ICompany } from '../interfaces/company.interface';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompaniesService extends NetworkService {
  private baseUrl: string = '/company';


  constructor(protected http: HttpClient) {
    super(http);
  }

  getCompany(): Promise<ICompany> {
    return this.http.get(this.apiUrl + this.baseUrl)
      .toPromise()
      .then((response: ICompany) => {
        return response;
      })
      .catch(this.handleError);
  }

}
