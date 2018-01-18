import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NetworkService {
  private _baseUrl: string = 'https://private-ff3a9-companyorganisation.apiary-mock.com/';

  constructor(protected http: HttpClient) {
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  public get defaultHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

}
