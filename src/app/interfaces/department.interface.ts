import { IMember } from './';

export interface IDepartmentShort {
  name: string;
  id: string;
}

export interface IDepartment {
  name: string;
  id: string;
  description: string;
  teamLeader: IMember;
}
