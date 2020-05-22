import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Button from '../../common/button';
import Building from '../../../core/building';
import Level from '../../../core/level';
import Controller from '../../../core/controller';
import Combobox from '../../common/combobox';
import ResponseCode from '../../../staticresources/responsecode';
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'
import Modal from '../../common/modal'

export default class ControllerManagemeent extends React.Component {

    DictBName = {};
    Build = [];
    DictBId = {};
    BIdInput = 0; 

    DictLvName = {};
    DictLvId ={};
    Level =[];
    LvIdInput = 0;

    ImeiInput = '';
    MACInput = '';


    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
            modalType: '',

        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();
       
    }

    columnsTable = [
        {
            title: 'Tòa nhà',
            field: 'bName'
        },
        {
            title: 'Tầng',
            field: 'lLv', 
            render: rowDate => {
                return(
                    <span>
                        Tầng {rowDate.lLv}
                    </span>
                )
            }
        },
        {
            title: 'Imei',
            field: 'imei',
        },
        {
            title: 'Địa chỉ MAC',
            field: 'mac',
        },
        {
            title: 'Khu vực',
            field: 'zone',
        },
        {
            title: 'Thời điểm phản hồi cuối cùng',
            field: 'health',
        },
        {
            title: 'Phiên bản Firmware',
            field: '',
        },
        
    ]

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            firstTooltip: 'Trang đầu',
            lastTooltip: 'Trang cuối',
        },
        body: {
            editRow: {
                deleteText: 'Bạn có chắc chắn muốn xoá thiết bị điều khiển này khỏi hệ thống? Các thông tin về tủ do thiết bị này quản lý cũng sẽ được xoá khỏi hệ thống nếu bạn chọn đồng ý?',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý',
            }
        }
    }

    optionsTable = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
        actionsColumnIndex: -1,
        toolbar: false,
        headerStyle: {
            border: '1px solid rgba(224, 224, 224, 1)' ,
            fontWeight: 'bold',
            textAlign: 'center', 
     
          },
        cellStyle: {
            border: '1px solid rgba(224, 224, 224, 1)'
        },
        actionsCellStyle: {
            color: 'rgb(60, 141, 188)',
            textAlign: 'center',
        },
        
    }

    actions = [
        {
          icon: () => <TableIcons.Edit/>,
          tooltip: 'Chỉnh sửa thông tin',
          onClick: (event, rowData) => {
            this.setState({

                modalType: 'editController',
            });

            let sendData = {
                ctlData: rowData,
                callback: this.onModelEditControllerCall,
                callbackFail: this.onModalCallFail,
            }
            this.modalRef.current && this.modalRef.current.onModalShow(sendData);
        }        },
        
    ]

    onModelEditControllerCall = () => {
        this.setState({
            modalType: 'successEditController',
        });
        let sendData = {
            callback: this.onModalCallSuccess,
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    } 

    onModalCallFail =() => {
        this.setState({
            modalType: 'failEditController',
        });
        this.modalRef.current && this.modalRef.current.onModalShow();

    }

    onModalCallSuccess = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }

    onClickAdd =() => {
        this.setState({
            modalType: 'addController'
        })

        let sendData = {
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFailAdd
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddController',
        })

        let sendData={
            callback: this.reloadDataTable,
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);

    }

    onModalCallFailAdd =() => {
        this.setState({
            modalType: 'failAddController',
        })

        let sendData = {
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    reloadDataTable =() => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }

    onChangeBLevel = (value) => {
        this.LvIdInput = this.DictLvId[value];
    } 

    onChangeBuild = (value) => {
        this.BIdInput = this.DictBId[value];
    }

    onChangeImeiInpput = (value) => {
        this.ImeiInput = value;
    }

    onChangeMACInput  = (value) => {
        this.MACInput = value;
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
            Controller.getController(this.BIdInput, this.LvIdInput, this.ImeiInput, this.MACInput,'', query.page +1)
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
                        totalCount:0,
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
    }

    onDeleteTableRow = (oldData) => {
        return new Promise((resolve, reject) => {
            Controller.removeController(oldData.cId)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.remove_ctl_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });
    }


    render() {

        let headerStyle = {
            color: this.state.headerColor,
        }

        return(
            <Fragment>
                <Modal type={this.state.modalType}
                    ref={this.modalRef}/>
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Quản lý thiết bị điều khiển
                    </h2>
                </div>
                
                <div  className ="around">
                    <div className= "title-style">
                        <span>
                            Danh sách thiết bị điều khiển hiện tại
                        </span>
                    </div>
                    <div   className="div-control" style={{width: '85%', display: 'flex'}}>
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
                            <Input 
                                title= {'Mã thiết bị'}
                                onChange = {this.onChangeImeiInpput}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Input 
                                title ={'Địa chỉ MAC'}
                                onChange = {this.onChangeMACInput}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Button
                                title={'Tìm kiếm'}
                                onClick= {this.onSearchClick}
                            />
                        </div>

                    </div>
                    <MaterialTable
                    tableRef = {this.tableRef}
                    columns = {this.columnsTable}
                    options={this.optionsTable}
                    icons = {TableIcons}
                    data = {this.getDataFromServer}
                    actions={this.actions}
                    editable={{
                        //onRowUpdate: this.onEditTableRow,
                        onRowDelete: this.onDeleteTableRow,
                    }}
                    localization={this.localizations}

                    />
                </div>
                <FButton 
                    title={'Thêm thiết bị'}
                    icon={<Add/>}
                    onClick={this.onClickAdd}
                    position = {['auto', 20, 'auto', 80]}
                    />

            </Fragment>
        );
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
