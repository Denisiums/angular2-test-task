import { Component, Input, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ISkill, IChartOptions, IChartDataItem } from '../../../interfaces';
import { Chart, Member } from '../../../models';

@Component({
  selector: 'app-skills-chart',
  templateUrl: './skills-chart.component.html',
  styleUrls: ['./skills-chart.component.scss']
})
export class SkillsChartComponent implements AfterViewInit, AfterViewChecked {

  @Input() public skills: ISkill[] = [];

  @ViewChild('canvas') private canvas: ElementRef;
  private chart: Chart;

  constructor() { }

  public ngAfterViewInit(): void {
    // this.input is NOW valid !!
    console.log('this.canvas: ', this.canvas.nativeElement);
    console.log('this.skills: ', this.skills);
    this.canvas.nativeElement.width = 400;
    this.canvas.nativeElement.height = 300;
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    // todo: colors + legend
    // const colors: string[] = ['#aaaaaa', '#ffaaff', '#bbbbff'];
    const options: IChartOptions = {
      canvas: canvasElement,
      seriesName: 'Skills',
      padding: 20,
      gridScale: 5,
      gridColor: '#dddddd',
      data: (this.skills as IChartDataItem[]),
    };

    this.chart = new Chart(options);
  }

  public ngAfterViewChecked(): void {
    if (this.chart && Member.isSkillsValid(this.skills)) {
      this.chart.draw();
    }
  }
}
