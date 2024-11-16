import React, { useState, useEffect } from 'react';
import WithLayout_User from '../shared/Layout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,BarElement,ArcElement);

const Analytics = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('/api/projects'); // Replace with your API endpoint
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects data:', error);
//       }
//     };

//     fetchProjects();
//   }, []);
  const projects = [
    { name: 'Project 1', views: 500, conversions: 75, completionRate: 85 },
    { name: 'Project 2', views: 300, conversions: 50, completionRate: 90 },
    { name: 'Project 3', views: 1000, conversions: 150, completionRate: 80 },
  ];

  const lineChartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: 'Project Views Over Time',
        data: projects.map((project) => project.views),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: 'Conversions',
        data: projects.map((project) => project.conversions),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: projects.map((project) => project.views),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: 'Completion Rate',
        data: projects.map((project) => project.completionRate),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto mt-[100px] ml-[200px] text-neutral-900">
      <h1 className="text-4xl font-bold mb-8 text-center">Project Analytics</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Total Projects</h2>
          <p className="text-4xl font-bold text-indigo-600">{projects.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Total Views</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {projects.reduce((total, project) => total + project.views, 0)}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Total Conversions</h2>
          <p className="text-4xl font-bold text-indigo-600">
            {projects.reduce((total, project) => total + project.conversions, 0)}
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Project Views Over Time</h2>
        <div className="p-6 bg-white shadow rounded-lg">
          <Line data={lineChartData} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Conversions vs Views</h2>
        <div className="p-6 bg-white shadow rounded-lg">
          <Bar data={barChartData} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Completion Rate by Project</h2>
        <div className="flex justify-center p-6 bg-white shadow rounded-lg">
          <div className="w-64 h-64">
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Detailed Analytics for Each Project</h2>
        {projects.map((project, index) => (
          <div key={index} className="p-6 mb-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{project.name}</h3>
            <p className="text-gray-600">Views: {project.views}</p>
            <p className="text-gray-600">Conversions: {project.conversions}</p>
            <p className="text-gray-600">Completion Rate: {project.completionRate}%</p>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Summary and Insights</h2>
        <div className="p-6 bg-white shadow rounded-lg">
          <p className="text-gray-700">
            Based on the data, Project 3 is currently leading in both views and conversions.
            However, Project 2 has the highest completion rate, which suggests strong user
            engagement. Consider focusing more on strategies that increase views for Project 2
            while maintaining the engagement levels.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WithLayout_User(Analytics);
