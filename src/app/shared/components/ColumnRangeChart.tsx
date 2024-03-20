import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from "highcharts/highcharts-more";

HCMore(Highcharts);

export interface ChartData {
    name: string;
    x: number;
    low: number;
    high: number;
    color?: string;
    visible?: boolean;
}

interface ChartProps {
    data: ChartData[];
    height: string;
}

const ColumnRangeChart : React.FC<ChartProps> = ({ data, height }) => {
    const options: Highcharts.Options = {
        title: {
            text: ''
        },
        chart: {
            renderTo: 'container',
            type: 'columnrange',
            inverted: true,
            height: height
        },
        xAxis: {
            lineWidth: 0, // Hide the x-axis line
            tickWidth: 0, // Hide the ticks on the x-axis
            labels: {
                enabled: false // Hide the x-axis labels
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                enabled: false // Hide the y-axis labels
            },
            gridLineWidth: 0 // Hide the y-axis grid lines
        },
        plotOptions: {
            columnrange: {
                groupPadding: 0,
                pointPadding: 0,
                borderWidth: 0,
                borderRadius: 5,
                maxPointWidth: 90
            },
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>'
            },
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'columnrange',
            data: data.filter(({ visible }) => visible !== false) // Filter out data points with visible = false
                .map(({ name, x, low, high, color }) => ({
                    name,
                    x,
                    low,
                    high,
                    color
                })),
        }]
    };

    return (
        <div>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
}

export default ColumnRangeChart;