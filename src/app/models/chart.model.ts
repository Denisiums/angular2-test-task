import { IChartOptions, IChartDataItem } from '../interfaces';

export class Chart {
  private options: IChartOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private colors: string[];
  private data: IChartDataItem[];

  constructor(options: IChartOptions) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;
    this.data = options.data;
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

  public draw(): void {
    this.clear();
    const maxValue: number = this.getDataMaxValue();
    const canvasActualHeight: number = this.canvas.height - this.options.padding * 2;
    const canvasActualWidth: number = this.canvas.width - this.options.padding * 2;

    this.drawGrid(maxValue, canvasActualHeight);
    this.drawBars(maxValue, canvasActualHeight, canvasActualWidth);
    this.drawSeriesName();
    // TODO
    // this.drawLegend();
  }

  private getDataMaxValue(): number {
    let max: number = 0;
    if (!this.data || !this.data.length) {
      return max;
    }

    this.data.forEach((item: IChartDataItem) => (max = Math.max(max, item.value)));
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

  private drawBars(maxValue: number, canvasActualHeight: number, canvasActualWidth: number): void {
    let barIndex: number = 0;
    const numberOfBars: number = this.data.length;
    const barSize: number = (canvasActualWidth) / numberOfBars;


    this.data.forEach((item: IChartDataItem) => {
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

  private drawSeriesName(): void {
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

  // private drawLegend(): void {
  //   let barIndex: number = 0;
  //   const legend = document.querySelector("legend[for='myCanvas']");
  //   var ul = document.createElement("ul");
  //   legend.append(ul);
  //   for (categ in this.options.data){
  //     var li = document.createElement("li");
  //     li.style.listStyle = "none";
  //     li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
  //     li.style.padding = "5px";
  //     li.textContent = categ;
  //     ul.append(li);
  //     barIndex++;
  //   }
  // }
}
