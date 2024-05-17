import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function LineChart() {
  const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 10000, 7500, 14300, 12000, 18000, 22000],
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 0, 0, 1)',
        pointHoverBackgroundColor: '#DF201F',
        pointHoverBorderColor: 'rgba(255, 0, 0, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw.toLocaleString()}rs`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          beginAtZero: true,
          callback: function (value: any) {
            return value.toLocaleString() + 'rs';
          },
        },
      },
    },
  };
  return (
    <div className="w-full h-64 sm:h-[300px] sm:w-[500px]   md:h-[280px] lg:h-96 lg:w-[520px] md:w-full ">
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
