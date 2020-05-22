import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import LokerStatusReport from '../../../core/report';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Combobox from '../../common/combobox';
import Button from '../../common/button';
import Building from '../../../core/building';
import Level from '../../../core/level';
import Controller from '../../../core/controller';

export default class LockerStatusReport extends React.Component {
    labelInput = '';
    lstatus = 0;
    DictBName = {};
    Build = [];
    DictBId = {};
    BIdInput = 0;
    DictBLvIName = {};
    DictBLvIId = {};
    Imei = [];
    BLvIInput = '';
    DictLvName = {};
    DictLvId ={};
    Level =[];
    LvIdInput = 0;

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
        };
        this.tableRef = React.createRef();
    }

    columns = [
        { title: 'Tòa nhà', field: 'bName' },
        { title: 'Tầng', field: 'lLv' },
        { title: 'Tủ', field: 'lLabel' },
        { title: 'Trạng thái', field: 'status', render: rowData => {
            if(rowData.status === 'FREE') {
                return (
                    <span style={{color: 'green'}}>
                        Tủ trống
                    </span>
                )
            }
            else if(rowData.status === 'OCCUPIED') {
                return (
                    <span style={{color: 'red'}}>
                        Tủ đang được sử dụng
                    </span>
                )
            }
            else if( rowData.status === 'DISABLED') {
                return (
                    <span style={{color: 'gray'}}>
                        Tủ bị vô hiệu hóa
                    </span>
                )
            }
            else {
                return (
                    <span style={{color: 'gray'}}>
                        Tủ có lỗi kĩ thuật
                    </span>
                )
            }
        } },
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

    optionsTable = {
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

    onLabelChange = (value) => 
    { 
        this.labelInput = value;
    }

    onStatusChange = (value) => {
        if(value === 'Tủ trống') {
            this.lstatus = 1;
        }
        else if (value === 'Tủ đang sử dụng') {
            this.lstatus = 2;
        }
        else if( value === 'Tủ bị vô hiệu hóa'){
            this.lstatus = 3;
        }
        else {
            this.lstatus = 4;
        }
      //  console.log(this.lstatus);
    }

    onChangeBLvI = (value) => {
        this.BLvIInput = this.DictBLvIId[value];
    }

    onChangeBLevel = (value) => {
        this.LvIdInput = this.DictLvId[value];
    } 
     
    onChangeBuild = (value) => {
        this.BIdInput = this.DictBId[value];
    }

    onSearchClick = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
        // if (typeof this.tableRef.current !== 'undefined'){
        //     this.tableRef.current.onQueryChange();
        // }
    }


    getDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
            LokerStatusReport.getStatusReport(this.BIdInput, this.LvIdInput, this.BLvIInput, this.labelInput, this.lstatus , query.page + 1 )
                .then(value => {
                    resolve({
                        data: value.items,
                        page: value.currentPage - 1,
                        totalCount: value.total,
                    }) 
                })
        })
    }

    componentDidMount() {
        Building.getBuilding()
        .then(value => {
            if(value) {
                if(value.items.length >0) {
                    value.items.map((item,index) => {
                        this.DictBName[item.bId] = item.bName;
                        this.DictBId[item.bName] = item.bId;
                        this.Build[index] = item.bName; 
                    })
                }
            } 
        })

        Level.getLevel()
        .then(value => {
            if(value){
                if(value.items.length >0) {
                    value.items.map((item, index) => {
                        let bLv = ' Tòa ' + item.bName + ' - Tầng '  + item.lLv;
                        this.DictLvName[item.lId] = bLv;
                        this.DictLvId[bLv] = item.lId;
                        this.Level[index] = bLv ;
                    }) 
                }
            }
        });

        Controller.getController()
        .then(value => {
            if(value) {
                if(value.items.length >0) {
                    value.items.map((item, index) => {
                        let bLvImei =' Tòa ' + item.bName + ' - Tầng '  + item.lLv + '- quản lý cụm tủ: ' + item.sLabel + ' đến ' +  item.eLabel;
                        this.DictBLvIName[item.imei] = bLvImei;
                        this.DictBLvIId[bLvImei] = item.imei;
                        this.Imei[index] = bLvImei;
                    })                    
                }
            }
        })
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
                        style={headerStyle}> Báo cáo trạng thái các tủ đang hoạt động trong hệ thống
                    </h2>
                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                        Danh sách các tủ đang hoạt động trong hệ thống                        </span>
                    </div>

                    <div className="div-control">
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Tòa nhà'} 
                                data = {this.Build}
                                onChange = {this.onChangeBuild}
                            /> 
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Tầng'}
                                data = {this.Level}
                                onChange = {this.onChangeBLevel}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Thiết bị quản lý'} 
                                data = { this.Imei}
                                onChange = { this.onChangeBLvI }
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Input 
                                title={'Nhãn tủ'} 
                                onChange = {this.onLabelChange
                            }
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox 
                            title={'Trạng thái tủ'} 
                            data= {[
                                'Tủ trống',
                                'Tủ đang sử dụng',
                                'Tủ bị vô hiệu hóa',
                                'Tủ có lỗi kỹ thuật'
                            ]}
                            onChange = {this.onStatusChange}
                            />  
                        </div>
                        <div style={styles.searchInput}>
                            <Button title={'Tìm kiếm'}
                                onClick={this.onSearchClick} 
                            />
                        </div>
                    </div>
                    <MaterialTable 
                        tableRef={this.tableRef}
                        columns = {this.columns}
                        options = {this.optionsTable}
                        icons= {TableIcons}
                        data = {this.getDataFromServer}
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

    searchContainer: {
        display: 'flex'
    },

    searchInput: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    }
}
