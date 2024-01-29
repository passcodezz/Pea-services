/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApexOptions } from "apexcharts";
import numeral from "numeral";
import ReactApexChart from "react-apexcharts";

type Props = {
  series?: Record<string, number>[];
};
const options: ApexOptions = {
  chart: {
    type: "bar",
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: 31,
    },
  },
  yaxis: {
    labels: {
      formatter(val) {
        return numeral(val).format("0,0");
      },
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },

  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
    offsetY: 0,
  },
  fill: {
    opacity: 1,
  },
};
const BarChart = (props: Props) => {
  return (
    <ReactApexChart
      options={options}
      series={props?.series as any}
      type="bar"
      height={350}
    />
  );
};

export default BarChart;
