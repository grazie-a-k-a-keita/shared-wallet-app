import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import type { PieChartProps } from '../../types/props';

ChartJS.register(Colors);
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props: PieChartProps) {
  const { graphData } = props;

  const data = {
    labels: ['食費', '外食費', '交通費', '日用品', '娯楽費', '特別日', 'その他'],
    datasets: [
      {
        data: [
          graphData[1],
          graphData[2],
          graphData[3],
          graphData[4],
          graphData[5],
          graphData[6],
          graphData[7],
        ],
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            labels: {
              font: {
                family: "'Noto Sans JP', 'sans-serif'",
                size: 12,
              },
              boxWidth: 14,
              boxHeight: 14,
            },
            position: 'bottom',
          },
        },
      }}
    />
  );
}

export default PieChart;
