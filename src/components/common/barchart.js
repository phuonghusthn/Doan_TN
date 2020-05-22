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
    color = Chart.helpers.color;
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onCreateChart = () => {
        const myChartRef = this.chartRef.current.getContext('2d');
        const { data, labels, backgroundColor } = this.props;



        this.myChart = new Chart(myChartRef, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        backgroundColor: this.color(backgroundColor[0]).rgbString(),
                        borderColor: backgroundColor[0],
                        borderWidth: 1,
                        label: labels[0],
                        data: [data[0]],
                        maxBarThickness: 40,
                        datalabels: {
                            anchor: 'end',
                        }
                    },
                    {
                        backgroundColor: this.color(backgroundColor[1]).rgbString(),
                        borderColor: backgroundColor[1],
                        borderWidth: 1,
                        maxBarThickness: 40,
                        label: labels[1],
                        data: [data[1]],
                        datalabels: {
                            anchor: 'end',
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
                        borderRadius: 25,
                        borderWidth: 2,
                        color: 'white',
                        display: true,
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
        this.myChart.data.datasets[0].data[0] = data[0];
        this.myChart.data.datasets[1].data[0] = data[1];
        this.myChart.update();
    }

    render() {
        return (
            <div style={styles.chartContainer}>
                <Link title={this.props.title} />
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