import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEditorComponent } from './skill-editor.component';
import { SkillComponent } from '../skill/skill.component';
import { SkillsChartComponent } from '../skills-chart/skills-chart.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SkillEditorComponent', () => {
  let component: SkillEditorComponent;
  let fixture: ComponentFixture<SkillEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillEditorComponent, SkillComponent, SkillsChartComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
