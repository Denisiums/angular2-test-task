import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NetworkService {
  private _apiUrl: string = 'https://private-ff3a9-companyorganisation.apiary-mock.com';

  constructor(protected http: HttpClient) {
  }

  protected handleError(err: any): any {
    console.log('A Network Error error occurred: ', err);
    return Promise.reject(new Error('Network error'));
  }

  public get apiUrl(): string {
    return this._apiUrl;
  }

  public getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

}
