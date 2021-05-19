import React, { ReactElement } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface CooldownTimeData {
  startDate: string;
  timeHrs: number;
}

export interface SingleFridgeBarChartProps {
  data: CooldownTimeData[]
  barColor?: string
}

function SingleFridgeBarChart(
  props : SingleFridgeBarChartProps,
) : ReactElement {
  const { barColor, data } = props;
  const color = barColor || '#88c7dc';
  return (
    <div style={{ width: '900px', height: '600px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="startDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="timeHrs" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SingleFridgeBarChart;
