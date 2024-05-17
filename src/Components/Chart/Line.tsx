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
<<<<<<< HEAD
          label: function (context: any) {
=======
          label: function (context :any) {
>>>>>>> 30af93ee6327c6119fb12e796f657558607f2a39
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
<<<<<<< HEAD
    <div className="w-full h-64 sm:h-[300px] sm:w-[500px]   md:h-[280px] lg:h-96 lg:w-[520px] md:w-full ">
=======
    <div className="w-full h-64 w-50   md:h-80 lg:h-96 lg:w-96 md:w-[700px] ">
>>>>>>> 30af93ee6327c6119fb12e796f657558607f2a39
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
