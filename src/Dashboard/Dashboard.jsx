import React from 'react'
import ReactECharts from 'echarts-for-react';

function Dashboard() {
    const optionPie = {
        title: {
            //   text: 'Referer of a Website',
            //   subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '100%',
                data: [
                    { value: 48, name: 'Direct Expense' },
                    { value: 735, name: 'Indirect Expense' },
                    { value: 735, name: 'Revenue' },

                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const expense = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };
    const revenue = {
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };
    const annualProfit = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    return (
        <div className='p-5' >

            <h1>Echarts & graphs</h1>
            <div>

                <ReactECharts option={optionPie} />
            </div>
            <div>

                <ReactECharts option={expense} />
            </div>
            <div>

                <ReactECharts option={revenue} />
            </div>
            <div>

                <ReactECharts option={annualProfit} />
            </div>
        </div>
    )
}

export default Dashboard