export interface IChartOptions {
  canvas: HTMLCanvasElement;
  seriesName?: string;
  padding: number;
  gridScale: number;
  gridColor: string;
}

export interface IChartDataItem {
  key: string;
  value: number;
}

export interface IChartLegendItem {
  key: string;
  value: number;
  color: string;
}
