import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ISkill } from '../../../interfaces';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Output() public removeSkill = new EventEmitter();
  @Output() public changeSkill = new EventEmitter();
  @Input() public skill: ISkill = null;
  @Input() public canEdit: boolean = true;

  public skillControl: FormControl;

  public ngOnInit(): void {
    this.skillControl = new FormControl(
      {value: this.skill.value, disabled: !this.canEdit},
      [Validators.required, Validators.min(0), Validators.max(100)]);
  }

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
    const key: string = this.skill.key;
    const value: number = this.skillControl.value;

    this.changeSkill.emit({
      key,
      value
    });
  }
}
