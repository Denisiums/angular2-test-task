export interface IMember {
  name: string;
  id: string;
  gender: 'F'|'M';
  job: string;
  description: string;
  skills: {
    [key: string]: number
  };
}

export interface IMemberShort {
  name: string;
  id: string;
}
