import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './title';

const data = [
  { name: "Income", value: 150020 },
  { name: "Expense", value: 50010 },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

const DoughnutChart = () => {
  return (
    <div className='w-full md:w-1/3 flex flex-col items-center bg-gray-50 dark:bg-transparent'>
      <Title title="Summary"/>
     <ResponsiveContainer width={"100%"} height={500}>
      <PieChart width={500} height={400}>
        {/*Tooltip- Adds a small popup (hover box) when you hover over a slice/line/bar. */}
        <Tooltip/>
        {/*Legend- Helps users know which color represents which data */}
        <Legend/> 
        <Pie
          data={data}
          innerRadius={0}
          outerRadius={180}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {/* entry = current object 
          index = current position */}
          {data.map((entry,index)=>(
            // Cell - to style each segment individually
            <Cell key={`cell-${index}`}
            // index % COLORS.length ensures colors repeat if there are more data items than colors.
            fill={COLORS[index % COLORS.length]}/>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    </div>
  )
}

export default DoughnutChart;
