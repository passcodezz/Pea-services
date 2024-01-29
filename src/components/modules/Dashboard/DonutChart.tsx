import Chart from "react-apexcharts";
type Props = {
  labels?: string[];
  series?: number[];
};
const DonutChart = (props: Props) => {
  return (
    <Chart
      options={{
        labels: props?.labels || [],
        colors: ["#FDBA8C", "#6092F1", "#3CD856", "#E95757"],
        legend: {
          position: "top",
        },
      }}
      type="donut"
      series={props?.series || []}
      width="100%"
    />
  );
};

export default DonutChart;
