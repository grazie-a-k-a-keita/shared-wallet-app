import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

type PieChartProps = {
  graphData: { 1: number; 2: number; 3: number; 4: number; 5: number; 6: number; 7: number };
};

ChartJS.register(Colors);
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props: PieChartProps) {
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
