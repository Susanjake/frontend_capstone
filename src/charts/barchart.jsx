import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const dummyData = [
  { classroom: 'ClassRoom1', value: 50},
  { classroom: 'ClassRoom2', value: 80 },
  { classroom: 'ClassRoom3', value: 65 },
  { classroom: 'ClassRoom4', value: 40 },
  { classroom: 'ClassRoom5', value: 95 },
];

const chartSetting = {
  xAxis: [
    {
      label: 'Completion rates',
      scaleType: 'linear',
    },
  ],
  yAxis: [
    {
      scaleType: 'band',
      dataKey: 'classroom',
    },
  ],
  series: [
    {
      dataKey: 'value',
      label: 'Dummy data',
      barSize: 10, // Adjust for bar thickness
      color:'#3E6259',
    },
  ],
  height: 400,
  width: 800,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-20px)',
    },
  },
};

function TickPlacementBars() {
  return (
    <>
    <h1 style={{color:'azure',fontSize:'25px'}}>Classroom Statistics</h1>
   
    <div style={{ width: '100%', display:'flex',justifyContent:'center'}}>
      
      <BarChart
        dataset={dummyData}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
    </>
  );
}

export default TickPlacementBars;
