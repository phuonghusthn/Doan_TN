import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import RealTimerReport from '../../../core/report';
import TableIcons from '../../common/materialicon';

export default class LockerRealTimeReport extends React.Component {

    columns = [
        { title: 'Tòa nhà', field: 'bName' },
        { title: 'Tầng', field: 'lLv' },
        { title: 'Tủ', field: 'lLabel' },
        { title: 'Hành động', field: 'act' , render : rowData => 
            {
                if(rowData.act === 'PICKUP_HOLD') {
                    return(
                        <span style={{color: 'green'}}>
                            Mở tủ
                        </span>
                    )
                }
                else if (rowData.act === 'DROPOFF'){
                    return(
                        <span  style ={{color: 'gray'}}>
                            Trả tủ
                        </span>
                    )
                }
                else {
                    return(
                        <span style ={{color: 'gray'}}>
                            Mở từ web
                        </span>
                    )
                }
            }
        },
        { title: 'Trạng thái của cánh tủ', field: 'dState', render: rowData =>
            {
                if(rowData.dState === 'CLOSE') {
                    return(
                        <span style={{color: 'red'}}>
                            Cánh tủ đóng
                        </span>
                    )
                }
                else {
                    return(
                        <span style={{color: 'green'}}>
                            Cánh tủ mở
                        </span>
                    )
                }
            }
        },
        { title: 'Người sử dụng cuối cùng', field: 'eName' },
        { title: 'ID nhân sự', field: 'eCode' },
        { title: 'Thời điểm thao tác lần cuối', field: 'aTime' },
    ] 

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            lastTooltip: 'Trang cuối',
            firstTooltip: 'Trang đầu'
        },
    }

    optionsTable =  
    {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
        toolbar: false,
        headerStyle: {
            border: '1px solid rgba(224, 224, 224, 1)',
            fontWeight: 'bold',
            textAlign: 'center',   
          },
        cellStyle: {
            border: '1px solid rgba(224, 224, 224, 1)'
        },
    }
    
    constructor(props) {
        super(props);
        this.state = {
            isUpdateView: false,
            headerColor: 'black',
        };
    }

    onMouseOverHeader = () => {
        this.setState({
            headerColor: 'red'
        })
    }

    onMouseLeaveHeader = () => {
        this.setState({
            headerColor: 'black'
        })
    }

    
    getDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
            RealTimerReport.getRealTimeReport()
                .then(value => {
                    if(value)
                    {
                        resolve({
                            data: value.items,
                            page: value.currentPage - 1,
                            totalCount: value.total,
                        })
                    }
                    else {
                        resolve({
                            data: [],
                            page: 0,
                            totalCount: 0,
                        })
                    }
                   
                })
        })
    }

    componentDidMount() {

    }

    render() {

        let headerStyle = {
            color: this.state.headerColor,
        }
        
        return(
            <Fragment>
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Theo dõi sự kiện sử dụng tủ thời gian thực
                    </h2>
                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                        Theo dõi sự kiện sử dụng tủ thời gian thực
                        </span>
                    </div>
                    <MaterialTable
                        columns = {this.columns}
                        options = {this.optionsTable}
                        data = {this.getDataFromServer}
                        icons = {TableIcons}
                        localization={this.localizations}
                    />
                </div>
            </Fragment>
        )
    }
}

const styles = {
    mainContainer: {
        margin: '30px 10px 40px 20px',

    },
}