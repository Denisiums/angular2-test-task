import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  public static compareStrings(stringA, stringB) {
    if (typeof stringA !== 'string' || typeof stringB !== 'string') {
      console.error('Compared values are not strings');
      return 0;
    }

    if (stringA.toLowerCase() < stringB.toLowerCase()) {
      return -1;
    }

    if (stringA.toLowerCase() > stringB.toLowerCase()) {
      return 1;
    }

    return 0;
  }

}
