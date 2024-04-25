
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    statusCounts: { InProgress: number; Done: number; Cancelled: number; New: number };
}

export default function Chart({statusCounts}: Props) {

    const data = {
        labels: ['Cancelled', 'New', 'InProgress', 'Done'],
        datasets: [
          {
            label: 'tasks',
            data: [statusCounts.Cancelled, statusCounts.New, statusCounts.InProgress, statusCounts.Done],
            backgroundColor: [
              'red',
              'lightblue',
              'yellow',
              'green',
      
            ],
            borderColor: [
              'red',
              'lightblue',
              'yellow',
              'green'
            ],
            borderWidth: 1,
          }, 
        ],
      };
      
    return (
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={data} />
        </div>
      );
}