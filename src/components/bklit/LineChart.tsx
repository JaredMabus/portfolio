import React from "react";
import AreaChart, { AreaChartProps } from "./AreaChart";

export interface LineChartProps extends AreaChartProps {
  showArea?: boolean;
}

export const LineChart: React.FC<LineChartProps> = (props) => {
  return <AreaChart {...props} />;
};

export default LineChart;
