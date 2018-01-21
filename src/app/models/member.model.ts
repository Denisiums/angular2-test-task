import { IMember, IMemberBackend, ISkill, ISkillsBackend } from '../interfaces';

export class Member implements IMember {
  public static readonly skillNameMaxLength: number = 255;
  public static readonly skillMinValue: number = 0;
  public static readonly skillMaxValue: number = 100;

  public name: string;
  public id?: string;
  public gender: 'F'|'M';
  public job: string;
  public description: string;
  public skills: ISkill[];

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
    newMember.skills = JSON.parse(JSON.stringify(member.skills));
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
      return null;
    }

    const result: ISkillsBackend = {};
    skills.forEach((skill: ISkill) => {
      result[skill.key] = skill.value;
    });
    return result;
  }

  public static skillToBackendObject(skill: ISkill): ISkillsBackend {
    if (!skill || !Member.isSkillValid(skill)) {
      return null;
    }

    return {
      [skill.key]: skill.value
    };
  }

  public static getRemovedSkills(original: ISkill[], changed: ISkill[]): ISkill[] {
    if (!original || !changed || !Array.isArray(original) || !Array.isArray(changed)) {
      return [];
    }

    const results: ISkill[] = [];
    original.forEach((oldSkill: ISkill) => {
      if (!changed.find((newSkill: ISkill) => oldSkill.key === newSkill.key)) {
        results.push(oldSkill);
      }
    });
    return results;
  }

  public static getNewSkills(original: ISkill[], changed: ISkill[]): ISkill[] {
    if (!original || !changed || !Array.isArray(original) || !Array.isArray(changed)) {
      return [];
    }

    const results: ISkill[] = [];
    changed.forEach((newSkill: ISkill) => {
      if (!original.find((oldSkill: ISkill) => oldSkill.key === newSkill.key)) {
        results.push(newSkill);
      }
    });
    return results;
  }

  public static getChangedSkills(original: ISkill[], changed: ISkill[]): ISkill[] {
    const results: ISkill[] = [];
    original.forEach((oldSkill: ISkill) => {
      const changedSkill: ISkill = changed.find(
        (newSkill: ISkill) => ((oldSkill.key === newSkill.key) && (oldSkill.value !== newSkill.value))
      );
      if (changedSkill) {
        results.push(changedSkill);
      }
    });
    return results;
  }

  public static isSkillValid(skill: ISkill): boolean {
    return !!(skill
      && skill.key
      && skill.key.length <= Member.skillNameMaxLength
      && typeof skill.value === 'number'
      && skill.value >= Member.skillMinValue
      && skill.value <= Member.skillMaxValue
    );
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

  public get skillsValid(): boolean {
    return (this.skills.every((skill: ISkill) => Member.isSkillValid(skill)));
  }

  public get prettyGender(): string {
    if (!this.gender) {
      return 'N/A';
    }
    return this.gender === 'M' ? 'Male' : 'Female';
  }
}
