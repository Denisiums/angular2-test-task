import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {
  private _apiUrl: string = 'https://private-ff3a9-companyorganisation.apiary-mock.com';

  constructor(protected http: HttpClient) {
  }

  protected handleError(err: any): any {
    // todo: there should be several types of errors, but no backend docs
    console.log('A Network Error occurred: ', err);
    return Promise.reject(new Error('Network error'));
  }

  public get apiUrl(): string {
    return this._apiUrl;
  }
}

