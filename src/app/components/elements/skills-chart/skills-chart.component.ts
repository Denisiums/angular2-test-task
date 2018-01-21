import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ISkill, IChartOptions, IChartDataItem } from '../../../interfaces';
import { Chart } from '../../../models';

@Component({
  selector: 'app-skills-chart',
  templateUrl: './skills-chart.component.html',
  styleUrls: ['./skills-chart.component.scss']
})
export class SkillsChartComponent implements OnInit, AfterViewInit {

  @Input() public skills: ISkill[] = [];

  @ViewChild('canvas') private canvas: ElementRef;
  private chart: Chart;

  constructor() { }

  public ngOnInit() {

  }

  public ngAfterViewInit(): void {
    // this.input is NOW valid !!
    console.log('this.canvas: ', this.canvas.nativeElement);
    console.log('this.skills: ', this.skills);
    this.canvas.nativeElement.width = 400;
    this.canvas.nativeElement.height = 300;
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    // todo: colors + legend
    const colors: string[] = ['#aaaaaa', '#ffaaff', 'bbbbff'];
    const options: IChartOptions = {
      /*canvas: HTMLCanvasElement;
    seriesName?: string;
    padding: number;
    gridScale: number;
    gridColor: string;
    data: IChartDataItem[];
    colors: string[];*/
      canvas: canvasElement,
      seriesName: 'Skills',
      padding: 10,
      gridScale: 5,
      gridColor: '#eeeeee',
      data: (this.skills as IChartDataItem[]),
      colors

    };

    this.chart = new Chart(options);
    this.chart.draw();
  }


}
