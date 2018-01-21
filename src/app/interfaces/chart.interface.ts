export interface IChartOptions {
  canvas: HTMLCanvasElement;
  seriesName?: string;
  padding: number;
  gridScale: number;
  gridColor: string;
  data: IChartDataItem[];
  colors: string[];
}

export interface IChartDataItem {
  key: string;
  value: number;
}
