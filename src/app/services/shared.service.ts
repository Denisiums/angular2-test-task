import { Injectable } from '@angular/core';
import { IMember } from '../interfaces';

@Injectable()
export class SharedService {

  private _teamLeader: IMember = null;

  public set teamLeader(member: IMember) {
    if (!member) {
      return;
    }
    this._teamLeader = member;
  }

  public get teamLeader(): IMember {
    return this._teamLeader;
  }
}
