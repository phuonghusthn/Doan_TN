import React, { Fragment } from 'react'
import DonutChart from '../common/donutchart'
import BarChart from '../common/barchart'
import {green, red, blue} from '@material-ui/core/colors'
import LockerReport from '../../core/report'


export default class Home extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            dataState: [], 
            totalFree: 0,
            totalUsing: 0,
            totalDisable: 0,
        };
        this.donutChartRef = React.createRef()
      
    }
    data=[];

   

    componentDidMount() {
      LockerReport.getStatusReport(0, 0, '', '', 1, 1)
        .then(value => {
             if(value){
                 this.setState({
                    totalFree:  value.total
                 });
                // this.totalFree = value.total;
                // this.data[0] = this.totalFree
             } 
            // console.log(value)
            // console.log(this.totalFree);
        });
        LockerReport.getStatusReport(0, 0, '', '', 2, 1)
        .then(value => {
             if(value){
                this.setState({
                    totalUsing:  value.total
                 });
                // this.totalUsing = value.total;
                // this.data[1] = this.totalUsing

                //this.data.push(this.totalUsing)

             } 
        });
        LockerReport.getStatusReport(0, 0, '', '', 3, 1)
        .then(value => {
             if(value){
                if(value.items){
                    this.setState({
                        totalDisable:  value.total
                     });
                    // this.totalDisable = value.total;
                    // this.data[2] = this.totalDisable

                    //this.data.push(this.totalDisable)

                }
             } 
        });

        this.donutChartRef.current && this.donutChartRef.current.onCreateChart();
        console.log(this.data);
        this.setState({
            dataState: this.data,
        })
        
    }

    render() {
        // console.log(this.data);
        // this.data.map((item, index) => {
        //     console.log(item);
        // })
        console.log(this.state.totalDisable)
        console.log(this.state.totalFree)
        console.log(this.state.totalUsing)

        return(
            <Fragment> 
                 <div>
                    <DonutChart ref={this.donutChartRef} title={'hello'} data={[this.state.totalFree, this.state.totalUsing, this.state.totalDisable]}  backgroundColor={[green[500], red[500], blue[500]]} labels={['trống', 'đang được sử dụng', 'vô hiệu hóa']}/>
                </div>
            </Fragment>
           
        )
    }
}