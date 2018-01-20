import { IMember, IMemberBackend, ISkill, ISkillsBackend } from '../interfaces';

export class Member implements IMember {
  public name: string;
  public id?: string;
  public gender: 'F'|'M';
  public job: string;
  public description: string;
  public skills: ISkill[];

  public skillsList: ISkill[];

  constructor() {
  }

  public static fromBackend(member: IMemberBackend) {
    const newMember = new Member();
    newMember.name = member.name;
    if (member.id) {
      newMember.id = member.id;
    }
    newMember.gender = member.gender;
    newMember.job = member.job;
    newMember.description = member.description;
    newMember.skills = Member.skillsObjectToArray(member.skills);
    return newMember;
  }

  public static fromFrontend(member: IMember) {
    const newMember = new Member();
    newMember.name = member.name;
    if (member.id) {
      newMember.id = member.id;
    }
    newMember.gender = member.gender;
    newMember.job = member.job;
    newMember.description = member.description;
    newMember.skills = member.skills;
    return newMember;
  }

  public static skillsObjectToArray(skills: ISkillsBackend ): ISkill[] {
    const results: ISkill[] = [];

    Object.keys(skills).forEach(key => {
      if (skills.hasOwnProperty(key)) {
        results.push({
          key,
          value: skills[key]
        });
      }
    });

    // todo: sort?
    return results;
  }

  public static skillsArrayToObject(skills: ISkill[]): ISkillsBackend {
    if (!skills || !skills.length) {
      return {};
    }

    const result: ISkillsBackend = {};
    skills.forEach((skill: ISkill) => {
      result[skill.key] = skill.value;
    });
    return result;
  }

  public addSkill(skill: ISkill): void {
    if (!skill || this.hasSkill(skill)) {
      // todo some notification?
      console.log('Member has this skill already');
      return;
    }

    this.skills.push(skill);
  }

  public removeSkill(skill: ISkill): void {
    if (!skill || !this.hasSkill(skill)) {
      return;
    }

    const index: number = this.skills.findIndex((oldSkill: ISkill) => oldSkill.key === skill.key);
    this.skills.splice(index, 1);
  }

  public setSkill(skill: ISkill): void {
    if (!skill || !this.hasSkill(skill)) {
      return;
    }

    this.skills.find((oldSkill: ISkill) => oldSkill.key === skill.key).value = skill.value;
  }

  public hasSkill(skill: ISkill): boolean {
    if (!skill) {
      return false;
    }

    return !!this.skills.find((oldSkill: ISkill) => oldSkill.key === skill.key);
  }

  public get prettyGender(): string {
    if (!this.gender) {
      return 'N/A';
    }
    return this.gender === 'M' ? 'Male' : 'Female';
  }
}
