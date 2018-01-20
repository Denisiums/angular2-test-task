import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISkill } from '../../../interfaces';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  @Output() public removeSkill = new EventEmitter();
  @Output() public changeSkill = new EventEmitter();
  @Input() public skill: ISkill = null;
  @Input() public canEdit: boolean = true;

  public remove(): void {
    if (!this.removeSkill || !this.skill || !this.canEdit) {
      return;
    }

    this.removeSkill.emit(this.skill);
  }

  public change(): void {
    if (!this.changeSkill || !this.skill || !this.canEdit) {
      return;
    }

    this.changeSkill.emit(this.skill);
  }
}
