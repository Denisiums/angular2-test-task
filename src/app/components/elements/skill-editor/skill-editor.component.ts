import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISkill } from '../../../interfaces';

@Component({
  selector: 'app-skill-editor',
  templateUrl: './skill-editor.component.html',
  styleUrls: ['./skill-editor.component.scss']
})
export class SkillEditorComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() public removeSkill = new EventEmitter();
  @Output() public addSkill = new EventEmitter();
  @Output() public changeSkill = new EventEmitter();
  @Input() public skills: ISkill[] = [];

  public newSkill: ISkill;

  public skillForm: FormGroup;

  public ngOnInit(): void {
    this.newSkill = {
      key: '',
      value: null
    };

    this.skillForm = this.fb.group({
      key: [this.newSkill.key, [Validators.required, Validators.maxLength(255)]],
      value: [this.newSkill.value, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  public remove(skill: ISkill): void {
    if (!skill || !this.removeSkill) {
      return;
    }

    this.removeSkill.emit(skill);
  }

  public change(skill: ISkill): void {
    if (!skill || !this.changeSkill) {
      return;
    }

    this.removeSkill.emit(skill);
  }

  public add(): void {
    if (!this.skillForm.valid || !this.addSkill || this.hasSameSkill) {
      return;
    }

    const skill: ISkill = {
      key: this.skillForm.get('key').value.trim(),
      value: this.skillForm.get('value').value
    };

    this.addSkill.emit(skill);
    this.skillForm.reset();
  }

  public get hasSameSkill(): boolean {
    const newSkillKey: string = this.skillForm.get('key').value;

    if (!this.skills || !this.skills.length || !newSkillKey) {
      return false;
    }

    return !!(this.skills.find((skill: ISkill) => skill.key === newSkillKey.trim()));
  }
}
