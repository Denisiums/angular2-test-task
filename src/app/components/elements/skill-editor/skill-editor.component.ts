import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ISkill } from '../../../interfaces';

@Component({
  selector: 'app-skill-editor',
  templateUrl: './skill-editor.component.html',
  styleUrls: ['./skill-editor.component.scss']
})
export class SkillEditorComponent {
  @Output() public remove = new EventEmitter();
  @Output() public add = new EventEmitter();
  @Input() public skills: ISkill[] = [];

  public removeSkill(skill: ISkill): void {
    if (!skill || !this.remove) {
      return;
    }

    this.remove.emit(skill);
  }


}
