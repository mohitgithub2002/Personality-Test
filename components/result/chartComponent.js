"use client"
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
const MyChartComponent = ({traitScore, trait}) => {
    const data = traitScore.map((item, index) => {
        return {
        id: index,
        label: trait[index].trait,
        value: item,
        };
    });

  return (
    <PieChart
    series={[
        {
          arcLabel: (item) => ` (${item.value})`,
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          innerRadius: 60,
          outerRadius: 120,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      width={400}
      height={400}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
export default MyChartComponent;