import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
const options: ApexOptions = {
  legend: {
    position: "bottom",
  },
};
type Props = {
  labels?: string[];
  series?: number[];
};

const PieChart = (props: Props) => {
  return (
    <Chart
      options={{
        ...options,
        labels: props?.labels || [],
        series: props?.series || [],
      }}
      type="pie"
      // series={[44, 55]}
      series={props?.series || []}
      width="100%"
    />
  );
};

export default PieChart;
