import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './chart.css';

export default function Chart({ title, data, dataKey, grid }) {
  function nFormatter(num, digits = 1) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }

  const [lineChart, setLineChart] = useState({
    series: [
      {
        name: 'Amount',
        data: [1000000, 2500000, 18000000, 4000000, 1500000, 32500000, 6000000, 10000000, 15000000, 3000000, 4500000, 10000000],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: true,
          color: '#f7f7f7',
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: '#858997',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: number, index: any) {
            return `$${nFormatter(val)}`;
          },
          style: {
            colors: '#858997',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
        },
        axisBorder: {
          show: true,
          color: '#f7f7f7',
          offsetX: -1,
          offsetY: 0,
        },
      },
    },
  });
  console.log(setLineChart);
  return (
    <div className='chart'>
      <h3 className='chartTitle'>{title}</h3>
      <ReactApexChart options={lineChart.options} series={lineChart.series} type='line' height={250} />
    </div>
  );
}
