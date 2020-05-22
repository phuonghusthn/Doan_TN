import React, { Fragment } from 'react';
import MaterialTable from 'material-table'
import TableIcons from '../../common/materialicon'
import Input from '../../common/input'
import Button from '../../common/button'
import Combobox from '../../common/combobox'
import HistoryReport from '../../../core/report'
import DatePicker from '../../common/datepicker';
import Building from '../../../core/building';
import Level from '../../../core/level';
import Controller from '../../../core/controller';

export default class LockerHistoryReport extends React.Component {

    labelInput = '';
    eNameInput = '';
    eCodeInput = '';
    sTimeInput = '';
    eTimeInput = ''
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

    columns = [
        { 
            title: 'Tòa nhà', 
            field: 'bName'
        },
        { 
            title: 'Tầng', 
            field: 'lLv'
        },
        { 
            title: 'Tủ',
             field: 'lLabel' },
        { 
            title: 'Hành động', 
            field: 'act',
            render: rowData => {
                if (rowData.act === 'DROPOFF') {
                    return(
                        <span style={{color: 'green'}}>
                            trả tủ
                        </span>
                    )
                }
                else if (rowData.act === 'PICKUP_HOLD'){
                    return(
                        <span style={{color: 'gray'}}>
                            mở tủ
                        </span>
                    )
                }
                else {
                    return(
                        <span style={{color: 'gray'}}>
                            Mở từ web
                        </span>
                    )
                }

            }
        },
        { 
            title: 'Trạng thái cánh tủ', 
            field: 'dState',
            render: rowData => {
                if ( rowData.dState === 'OPEN') {
                    return(
                        <span style={{color: 'grên'}}>
                            cánh tủ mở
                        </span>
                    )
                }
                else 
                {
                    return(
                        <span style={{color: 'red'}}>
                            cánh tử đóng
                        </span>
                    )
                }
                
            }
        },
        { 
            title: 'Người sử dụng cuối cùng',
             field: 'eName' 
        },
        { 
            title: 'ID nhân sự',
             field: 'eCode' 
        },
        { 
            title: 'Thời điểm thao tác cuối cùng',
             field: 'aTime' 
        },
       
    ]

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            lastTooltip: 'Trang cuối',
            firstTooltip: 'Trang đầu'
        },
    }

    options1 = {
        search: false,
        showTitle: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
        toolbar: false,
        headerStyle: {
            border: '1px solid rgba(224, 224, 224, 1)',
            textAlign: 'center', 
            fontWeight: 'bold'  
          },
        cellStyle: {
            border: '1px solid rgba(224, 224, 224, 1)'
        },
    } 

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();

    }

    onLabelChange  = (value) => 
    {
        this.labelInput = value;
    }

    onENameChange = (value) => {
        this.eNameInput = value;
    }

    onECodeChange = (value) => {
        this.eCodeInput = value;
    }

    onSTimeChange = (value) => {
        this.sTimeInput = value;
    }

    onETimeChange = (value) => {
        this.eTimeInput = value;
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

    onSearchClick  = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
        // if (typeof this.tableRef.current !== 'undefined'){
        //     this.tableRef.current.onQueryChange();
        // }
    }

    getDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
            HistoryReport.getHistoryReport(this.BIdInput, this.LvIdInput, this.BLvIInput, this.labelInput, this.eNameInput, this.eCodeInput, this.sTimeInput, this.eTimeInput, query.page +1)
            .then(value => {
                if(value){
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

    render() {

        let headerStyle = {
            color: this.state.headerColor,
        }

        return(
            <Fragment>
                <div style={styles.mainContainer}>
                  <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Báo cáo lịch sử sử dụng tủ trong hệ thống
                    </h2>

                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                        Danh sách lịch sử sử dụng tủ trong hệ thống                        </span>
                    </div>
                    <div style={{display: 'flex'}}>
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
                            onChange={this.onLabelChange} 
                        />
                        </div>
                        <div style={styles.searchInput}>
                        <Input 
                            title={'Tên nhân viên'} 
                            onChange={this.onENameChange} 
                        />
                        </div>
                        <div style={styles.searchInput}>
                        <Input 
                            title={'ID nhân sự'} 
                            onChange={this.onECodeChange} 
                        /> 
                        </div>
             
                    </div>
                    <div className="div-control" style={{display: 'flex', width: '50%'}}>
                        <div style={styles.searchInput}>
                            <DatePicker
                                title={'Ngày bắt đầu'}
                                onChange = {this.onSTimeChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <DatePicker 
                                title ={'Ngày kết thúc'}
                                onChange = {this.onETimeChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Button title={'Tìm kiếm'}
                                onClick={this.onSearchClick} />
                        </div>
                    </div>
                    <MaterialTable
                        tableRef={this.tableRef}
                        options={this.options1}
                        icons={TableIcons}
                        columns={this.columns}
                        data={this.getDataFromServer}
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