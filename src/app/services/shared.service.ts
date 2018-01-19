import { Injectable } from '@angular/core';
import { Member } from '../models';

@Injectable()
export class SharedService {

  private _teamLeader: Member = null;

  public set teamLeader(member: Member) {
    console.log('set team leader: ', member);
    if (!member) {
      return;
    }
    this._teamLeader = member;
  }

  public get teamLeader(): Member {
    return this._teamLeader;
  }
}
