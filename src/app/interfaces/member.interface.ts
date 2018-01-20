export interface IMemberBackend {
  name: string;
  id?: string;
  gender: 'F'|'M';
  job: string;
  description: string;
  skills: {
    [key: string]: number
  };
}

export interface IMember {
  name: string;
  id?: string;
  gender: 'F'|'M';
  job: string;
  description: string;
  skills: ISkill[];
}

export interface IMemberShort {
  name: string;
  id: string;
}

export interface ISkill {
  key: string;
  value: number;
}

export interface ISkillsBackend {
  [key: string]: number;
}
