import { IMember, ISkill } from '../interfaces';

export class Member implements IMember {
  public name: string;
  public id?: string;
  public gender: 'F'|'M';
  public job: string;
  public description: string;
  public skills: {
    [key: string]: number
  };

  constructor(member: IMember) {
    this.name = member.name;
    if (member.id) {
      this.id = member.id;
    }
    this.gender = member.gender;
    this.job = member.job;
    this.description = member.description;
    this.skills = Object.assign({}, member.skills);
  }

  public get skillsList(): ISkill[] {
    const results: ISkill[] = [];

    Object.keys(this.skills).forEach(key => {
      if (this.skills.hasOwnProperty(key)) {
        results.push({
          key,
          value: this.skills[key]
        });
      }
    });

    // todo: sort?
    return results;
  }

  public addSkill(skill: ISkill): void {
    if (!skill || this.hasSkill(skill)) {
      console.log('Member has this skill already');
      return;
    }

    this.skills[skill.key] = skill.value;
  }

  public removeSkill(skill: ISkill): void {
    if (!skill || !this.hasSkill(skill)) {
      return;
    }

    delete this.skills[skill.key];
  }

  public hasSkill(skill: ISkill): boolean {
    if (!skill) {
      return false;
    }

    return this.skills.hasOwnProperty(skill.key);
  }
}
