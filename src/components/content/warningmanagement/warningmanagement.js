import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Combobox from '../../common/combobox';
import Button from '../../common/button';
import DatePickers from '../../common/datepicker';
import Warning from '../../../core/warning';
import Building from '../../../core/building';
import Level from '../../../core/level';
import Controller from '../../../core/controller';

export default class WarningManagement extends React.Component {
    DictBuilding = {};
    DictLevel ={};
    LabelInput ='';
    ActInput = '';
    TypeWInput = 0;
    Method ='';
    isRead = 0;
    DictBName = {};
    Build = [];
    DictBId = {};
    BIdInput = 0;
    DictLvName = {};
    DictLvId ={};
    Level =[];
    LvIdInput = 0;
    DictBLvIName = {};
    DictBLvIId = {};
    Imei = [];
    BLvIInput = '';
    sTimeInput = '';
    eTimeInput = '';

    constructor(props) {
        super(props);
        this.state = {
            isUpdateView: false,
            headerColor: 'black',
        };
        this.tableRef = React.createRef();
       
    }

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            lastTooltip: 'Trang cuối',
            firstTooltip: 'Trang đầu'
        },
    }

    columnsTable = [
        { title: 'Loại cảnh báo', field: 'tID', render: rowData => {
            if (rowData.tId === 2) {
                return(
                    <span style ={{color: 'red'}}>
                        Thiết bị mất kết nối
                    </span>
                )
            }
            else {
                return(
                    <span style ={{color: 'green'}}>
                        truy cập tủ trái phép
                    </span>
                )
            }

        } },
        { title: 'Hình thức', field: 'method', render: rowData => {
            if (rowData.tId === 2) {
                return(
                    <span>
                        
                    </span>
                )
            }
            else {
                return(
                    <span style ={{color: 'green'}}>
                        Không rõ
                    </span>
                )
            }

        } },
        { 
            title: 'Tòa nhà', 
            field: 'bId',
            render: rowData => {
                return(
                    <span>{this.DictBuilding[rowData.bId]}</span>
                )
            } 
        },
        { 
            title: 'Tầng', 
            field: 'lLv', 
            render: rowData => {
                return(
                    <span>
                        Tầng {this.DictLevel[rowData.lLv]}
                    </span>
                )
            }
        },
        { 
            title: 'Tủ', 
            field: 'label' 
        },
        { 
            title: 'Thiết bị quản lý',
             field: 'imei' 
        },
        { 
            title: 'Thời gian ghi nhận',
             field: 'wTime' 
        },
    ] 

    optionsTable = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTilte: false,
        rowStyle: {
            backgroundColor: '#EEE',
        },
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

    onLabelChange = (value) => {
        this.LabelInput = value;
    }

    onActChange = (value) => {
        
    }

    onIsReadChange = (value)=> {
        if (value === 'Đã đọc') {
            this.isRead = 2;
        }
        else {
            this.isRead = 1;
        }
    }

    onTypeWChange = (value) => {
        if(value === 'Truy cập trái phép') {
            this.TypeWInput = 1;
        }
        else {
            this.TypeWInput = 2;
        }
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

    onSTimeChange = (value) => {
        this.sTimeInput = value;
    }

    onETimeChange = (value) => {
        this.eTimeInput = value;
    }
    
    onSearchClick = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
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
            Warning.getWarning(this.BIdInput, this.LvIdInput, this.BLvIInput, this.LabelInput,'',this.TypeWInput, this.isRead, this.sTimeInput, this.eTimeInput, query.page +1)
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
        Level.getLevel()
        .then(value => {
            if(value){
                if(value.items.length >0) {
                    value.items.map((item, index) => {
                        let bLv = ' Tòa ' + item.bName + ' - Tầng '  + item.lLv;
                        this.DictLvName[item.lId] = bLv;
                        this.DictLvId[bLv] = item.lId;
                        this.Level[index] = bLv ;
                        this.DictLevel[item.lId] = item.lLv;
                    }) 
                }
            }
        });

        Building.getBuilding()
            .then(value => {
                if(value) {
                    if(value.items.length >0) {
                        value.items.map((item,index) => {
                            this.DictBuilding[item.bId] = item.bName;
                            this.DictBName[item.bId] = item.bName;
                            this.DictBId[item.bName] = item.bId;
                            this.Build[index] = item.bName; 
                        })
                    }
                } 
        })

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
                        style={headerStyle}>Cảnh báo hệ thống
                    </h2>
                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                         Danh sách các cảnh báo hệ thống
                        </span>
                    </div>
                    <div style={styles.searchContainer}>
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
                                onChange = {this.onLabelChange }
                            />
                        </div>

                        <div style={styles.searchInput}>
                            <Combobox 
                                title={'Tác nhân'} 
                                data = {[
                                    'Ra lệnh mở từ website quản trị',
                                    'Mở trục tiếp bằng thẻ Admin',
                                    'Không rõ'
                                ]}
                                onChange = {this.onActChange}
                            />
                        </div>

                        <div style={styles.searchInput}>
                            <Combobox 
                                title={'Loại cảnh báo'}
                                data ={[
                                    'Truy cập trái phép',
                                    'Thiết bị mất kết nối'
                                ]}
                                onChange = {this.onTypeWChange}
                            />  
                        </div>

                    </div>
                    <div  className="div-control" style={{ width: '70%'}}>
                        <div style={styles.searchInput}>
                            <Combobox 
                                title={'Trạng thái đọc'}
                                data = {[
                                    'Đã đọc',
                                    'Chưa đọc'
                                ]}
                                onChange = {this.onIsReadChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <DatePickers 
                                title={'Ngày bắt đầu'}
                                onChange = {this.onSTimeChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <DatePickers 
                                title ={'Ngày kết thúc'}
                                onChange = {this.onETimeChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Button 
                                title={'Tìm kiếm'}
                                onClick={this.onSearchClick} 
                            />
                        </div>
                        
                    </div>
                    <MaterialTable 
                        tableRef={this.tableRef}
                        options = {this.optionsTable}
                        icons= {TableIcons}
                        data = {this.getDataFromServer}
                        columns = {this.columnsTable}
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