import React from "react";

export interface TimeSeriesPoint {
  date: string | Date;
  [key: string]: string | number | Date | undefined;
}

export interface CategoricalPoint {
  name: string;
  [key: string]: string | number | undefined;
}

export interface RadarPoint {
  dimension: string;
  [key: string]: string | number;
}

export interface DonutPoint {
  name: string;
  value: number;
  color?: string;
}

export interface HeatmapCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface SeriesConfig {
  dataKey: string;
  label?: string;
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TooltipItem {
  name: string;
  value: number | string;
  color: string;
}
