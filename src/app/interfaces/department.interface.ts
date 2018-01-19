import { IMember } from './';
import { Member } from '../models';

export interface IDepartmentShort {
  name: string;
  id: string;
}

export interface IDepartment {
  name: string;
  id: string;
  description: string;
  teamLeader: Member;
}

export interface IDepartmentBackend {
  name: string;
  id: string;
  description: string;
  teamLeader: IMember;
}
