import React, { ReactElement } from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';

export interface FridgePieChartItem {
  name: string;
  value: number;
}

export interface SingleFridgePieChartProps {
  data: FridgePieChartItem[];
  title: string;
}

const COLORS = ['#0088FE', '#B5D3E7', '#FFBB28', '#4c9141'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/**
 * A generic pie chart that can be used to display the processed
 * data.
 *
 * @param props the processed data and title for the pie chart
 * @returns A rendered pie chart
 */
function SingleFridgePieChart(
  { data, title }: SingleFridgePieChartProps,
) : ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        textAlign: 'center',
        paddingBottom: '80px',
      }}
    >
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="100%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SingleFridgePieChart;
