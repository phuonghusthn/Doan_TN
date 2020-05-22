import React from 'react'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Link from '../common/link'


Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
    color: '#FE777B'
});
Chart.plugins.register(ChartDataLabels)

export default class DonutChart extends React.Component {
    myChart;
    chartRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    onCreateChart = () => {
        const myChartRef = this.chartRef.current.getContext('2d');
        const { data, labels, backgroundColor } = this.props;

        // if (typeof (myChart) !== 'undefined') {
        //     myChart.destroy();
        // }

        this.myChart = new Chart(myChartRef, {
            outerRadius: 1.5,
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: backgroundColor,
                        data: data,
                        datalabels: {
                            anchor: 'end'
                        }
                    }
                ],
            },
            options: {
                maintainAspectRatio: false,
                animation: {
                    animateSacale: true,
                },
                responsive: true,
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        padding: 20,
                    },
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 20,
                    }
                },
                plugins: {
                    datalabels: {
                        backgroundColor: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        borderColor: 'white',
                        borderRadius: 200,
                        borderWidth: 2,
                        color: 'white',
                        display: function (context) {
                            var dataset = context.dataset;
                            var count = dataset.data.length;
                            var value = dataset.data[context.dataIndex];
                            return value > count * 1.5;
                        },
                        font: {
                            weight: 'bold'
                        },
                        formatter: Math.round
                    }
                }
            }
        })
    }

    componentDidMount() {
        this.onCreateChart();
    }

    componentDidUpdate() {
        this.onCreateChart();
    }

    onUpdateChart = (data) => {
        this.myChart.data.datasets[0].data = data;
        this.myChart.update();
    }

    render() {
        return (
            <div style={styles.chartContainer}>
                <Link title={this.props.title}/>
                <div style={styles.chartContent}>
                    <canvas ref={this.chartRef} />
                </div>
            </div>
        )
    }
}

const styles = {

    chartContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    chartContent: {
        width: '80%',
        height: '80%',
    },
}