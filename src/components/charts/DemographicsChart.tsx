import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DemographicsChartProps {
  data: { [key: string]: string | number }[]; // Accepts an array of objects with dynamic keys
}

const DemographicsChart: React.FC<DemographicsChartProps> = ({ data }) => {
  // Step 1: Extract keys for labels and data
  // Here, we'll assume we use the first key as the label and another key (like "denim_size") as the data
  if (data.length === 0) return null; // Return null if no data is available

  // Dynamically select the first key as the label (x-axis) and another key as the value (y-axis)
  const keys = Object.keys(data[0]); // Extract all keys from the first object
  const labelKey = keys[0]; // Assume the first key is used as the label (e.g., AGE_RANGE)
  const valueKey = keys[1]; // Assume the second key is used as the value (e.g., denim_size)

  // Step 2: Prepare the chart data
  const labels = data.map(item => item[labelKey]); // Extract the labels (e.g., AGE_RANGE)
  const values = data.map(item => item[valueKey]); // Extract the values (e.g., denim_size)

  // Step 3: Prepare the chart data format for Chart.js
  const chartData = {
    labels: labels, // x-axis labels
    datasets: [
      {
        label: valueKey, // Label for the dataset (e.g., "denim_size")
        data: values, // Corresponding values for the y-axis
        backgroundColor: '#3498db', // Customize the color as needed
      },
    ],
  };

  // Step 4: Define chart options
  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }, // Ensure the y-axis starts at zero
    },
  };

  // Step 5: Render the Bar chart with the data and options
  return <Bar data={chartData} options={options} />;
};

export default DemographicsChart;