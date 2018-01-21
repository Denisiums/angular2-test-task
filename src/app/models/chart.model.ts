import { IChartOptions, IChartDataItem, IChartLegendItem } from '../interfaces';
import * as getRandomColor from 'randomcolor';

export class Chart {
  private chartLegend: IChartLegendItem[];
  private options: IChartOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private colors: string[];

  constructor(options: IChartOptions) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = [];
  }

  public static drawLine(ctx, startX: number, startY: number, endX: number, endY: number, color: string): void {
    if (!ctx) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }

  public static drawBar(ctx, upperLeftCornerX: number, upperLeftCornerY: number, width: number, height: number, color: string) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
  }

  public draw(chartData: IChartDataItem[]): void {
    this.clear();
    this.fillColors(chartData);
    const maxValue: number = this.getDataMaxValue(chartData);
    const canvasActualHeight: number = this.canvas.height - this.options.padding * 2;
    const canvasActualWidth: number = this.canvas.width - this.options.padding * 2;

    this.drawGrid(maxValue, canvasActualHeight);
    this.drawBars(chartData, maxValue, canvasActualHeight, canvasActualWidth);
    this.drawSeriesName(chartData);
    this.generateLegend(chartData);
  }

  public get legend(): IChartLegendItem[] {
    if (!this.chartLegend) {
      return [];
    }

    return this.chartLegend;
  }

  private getDataMaxValue(chartData: IChartDataItem[]): number {
    let max: number = 0;
    if (!chartData || !chartData.length) {
      return max;
    }

    chartData.forEach((item: IChartDataItem) => (max = Math.max(max, item.value)));
    return max;
  }

  private drawGrid(maxValue: number, canvasActualHeight: number): void {
    let gridValue: number = 0;
    while (gridValue <= maxValue) {
      // draw lines
      const gridY: number = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      Chart.drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );

      // draw markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = 'bottom';
      this.ctx.font = 'bold 10px';
      this.ctx.fillText(gridValue.toString(), 0, gridY - 2);
      this.ctx.restore();
      gridValue += this.options.gridScale;
    }
  }

  private drawBars(chartData: IChartDataItem[], maxValue: number, canvasActualHeight: number, canvasActualWidth: number): void {
    let barIndex: number = 0;
    const numberOfBars: number = chartData.length;
    const barSize: number = (canvasActualWidth) / numberOfBars;


    chartData.forEach((item: IChartDataItem) => {
      const value: number = item.value;
      const barHeight: number = Math.round( canvasActualHeight * value / maxValue) ;
      Chart.drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

      barIndex++;
    });
  }

  private drawSeriesName(chartData: IChartDataItem[]): void {
    if (!chartData || !chartData.length) {
      return;
    }
    this.ctx.save();
    this.ctx.textBaseline = 'bottom';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#000000';
    this.ctx.font = 'bold 14px sans-serif';
    this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height);
    this.ctx.restore();
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private fillColors(chartData: IChartDataItem[]): void {
    // https://github.com/davidmerfield/randomColor
    if (!this.colors || !chartData || !chartData.length || !getRandomColor) {
      return;
    }

    const delta: number = chartData.length - this.colors.length;
    for (let i = 0; i < delta; i++) {
      this.colors.push(getRandomColor());
    }
  }

  private generateLegend(chartData: IChartDataItem[]) {
    const DEFAULT_COLOR: string = '#eeeeee';
    if (!chartData || chartData.length > this.colors.length) {
      return [];
    }

    this.chartLegend = chartData.map((item: IChartDataItem, index: number) => {
      const color: string =  this.colors[index] || DEFAULT_COLOR;
      return {
        key: item.key,
        value: item.value,
        color
      };
    });
  }
}
