import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISkill } from '../../../interfaces';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  @Output() public remove = new EventEmitter();
  @Input() public skill: ISkill = null;

  public removeSkill(): void {
    if (!this.remove || !this.skill) {
      return;
    }

    this.remove.emit(this.skill);
  }
}
