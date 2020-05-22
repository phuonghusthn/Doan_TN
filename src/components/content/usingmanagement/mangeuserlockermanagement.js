import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import UserLoker from '../../../core/user';
//import LokerUsage from '../../../core/locker';
import ManageLoker from '../../../core/locker';
import TableIcons from '../../common/materialicon';
import Department from '../../../core/department';
import Input from '../../common/input';
import Button from '../../common/button';
import Combobox from '../../common/combobox';
import Building from '../../../core/building';
import Level from '../../../core/level';
import Controller from '../../../core/controller';
import Modal from '../../common/modal';
import {blue} from '@material-ui/core/colors'
import ResponseCode from '../../../staticresources/responsecode';

export default class ManageUserLockerManagement extends React.Component {
    dictDev ={};
    ENameInput = '';
    ECodeInput = '';
    LabelInput = '';
    LabelInputTable2 = '';
    Dep = [];
    dictDid = {};
    dIdInput = 0;
    DictLvName = {};
    DictLvId ={};
    Level =[];
    LvIdInput = 0;
    DictBLvIName = {};
    DictBLvIId = {};
    Imei = [];
    BLvIInput = '';
    DictBName = {};
    Build = [];
    DictBId = {};
    BIdInput1 = 0;
    BIdInput2 = 0;
    EmpSelected = '';
    NameEmpSelected = '';

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
            modalType: '',
            nameEmpSelected: '',
            ecodeEmptySelected: '',
        };
        this.tableRef1 = React.createRef();
        this.tableRef2 = React.createRef();

        this.modalRef = React.createRef();
    
    }

    localizationsTable1 = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            firstTooltip: 'Trang đầu',
            lastTooltip: 'Trang cuối'
        },
        body: {
            editRow: {
                deleteText: 'Bạn có chắc chắn muốn xoá quyền sử dụng tủ của nhân viên này? Tất cả các tủ đã được cấp phát cho nhân viên này sử dụng sẽ được huỷ bỏ nếu bạn chọn Đồng Ý!',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý',
            }
        }
    }

    localizationsTable2 = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            firstTooltip: 'Trang đầu',
            lastTooltip: 'Trang cuối'
        },
        body: {
            editRow: {
                deleteText: 'Bạn có chắc chắn muốn xoá quyền sử dụng tủ này của nhân viên?',
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
        rowStyle: rowData =>({
            backgroundColor: (rowData.tableData.id %2)?'rgb(247, 247, 247)': '#FFF',
        }),
        toolbar: false,
        headerStyle: {
            border: '1px solid rgba(224, 224, 224, 1)',
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
          icon: () => <TableIcons.Extension style={{color: blue[500]}}/>,
          tooltip: 'Thêm tủ cho nhân viên',
          onClick: (event, rowData) => {
            this.setState({
                modalType: 'addLoker',
                nameEmpSelected: rowData.eName,
                ecodeEmptySelected: rowData.eCode,
            });

            this.EmpSelected = rowData.eCode;
            this.NameEmpSelected = rowData.eName;
            console.log(this.state.modalType);
            let sendData = {
                empData: rowData,
                callback: this.reloadData,
                callbackMapSuccess: this.successcall,
                callbackMapFail: this.failcall,
            }
            this.modalRef.current && this.modalRef.current.onModalShow(sendData);
        }
        },
    ]

    successcall =() =>  {
        this.setState({
            modalType: 'successMapExistedLocker'
        })
        
        let sendData ={
            // locker: this.listLockerChecked,
            // empSelected: this.props.data.empData,
            callback: this.reloadData
            
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData)    
    }

    failcall =() =>  {
        this.setState({
            modalType: 'failMapExistedLocker'
        })

        
        let sendData ={
            // locker: this.listLockerChecked,
            // empSelected: this.props.data.empData,
            // callback: this.successcall
            
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData)    
    }




    reloadData = () => {
        this.tableRef1.current && this.tableRef1.current.onQueryChange();
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
    
    }

    closeModal =() => {
        this.setState({
            modalType: '',
        })
    }

    columnsTable1 = [
        {
             title: 'Họ và tên', 
             field: 'eName'
        },
        {
             title: 'ID nhân sụ', 
             field: 'eCode'
         },
        { 
            title: 'Bộ phận làm việc',
            field: 'dId',
            lookup: this.dictDev,

            // render: rowData => {
            //     return(
            //         <span>
            //             {this.dictDev[rowData.dId]}
            //         </span>
            //     )
            // }
        },
        {
            title: 'Số tủ được phép sử dụng', 
            field:'lNum'
        },
    ]

    columnsTable2 = [
        {
            title: 'Tòa',
            field: 'bId'
        },
        {
            title: 'Tầng',
            field: 'lLv'
        },
        {
            title: 'Tủ',
            field: 'lLb'
        },
       
    ]

    onChangeBLvI = (value) => {
        this.BLvIInput = this.DictBLvIId[value];
    }

    onChangeBLevel = (value) => {
        this.LvIdInput = this.DictLvId[value];
    }

    onChangeBuild1 = (value) => {
        this.BIdInput1 = this.DictBId[value];
    }

    onChangeBuild2 = (value) => {
        this.BIdInput2 = this.DictBId[value];
    }

    onChangDep = (value) => {
        this.dIdInput = this.dictDid[value];
    } 

    onENameChange = (value) => {
        this.ENameInput = value;
    }

    onECodeChange = (value) => {
        this.ECodeInput = value;
    } 

    onLabelChange = (value) => {
        this.LabelInput = value;
    }

    onLabelChange2 = (value) => {
        this.LabelInputTable2 = value;
    }

    onSearchClick1 = () => {
        this.tableRef1.current && this.tableRef1.current.onQueryChange();
    }

    onSearchClick2 = () => {
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
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
            UserLoker.getUsage(this.ENameInput, this.ECodeInput, this.LabelInput, this.dIdInput, this.BIdInput1, query.page +1)
            .then(value => {
                if(value !== null){
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
               // console.log(value.items.eId);  
            })
        })
    }

    getLokerDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
         //  ManageLoker.getManageLocker(this.BIdInput2, this.LvIdInput, this.BLvIInput , this.LabelInputTable2, query.page +1)
        ManageLoker.getUsage(this.EmpSelected, this.LabelInputTable2, this.BLvIInput, this.LvIdInput, this.BIdInput2, query.page + 1)
            .then(value => {
                if(value.items) {
                    resolve({
                        data: value.items,
                        page: value.currentPage - 1,
                        totalCount: value.total,
                    }) 
                    console.log(value.items)

                }
                else {
                    resolve({
                        data: value.items,
                        page: 0,
                        totalCount: 0,
                    }) 
                }
                
            })
        })
    }

    componentDidMount() {
        Department.getDepartment()
        .then(value => {
            if(value) {
                if(value.items.length >0) {
                    value.items.map((item, index) => {
                        this.dictDev[item.dId] = item.dName;
                        this.Dep[index] = item.dName;
                        this.dictDid[item.dName] = item.dId;
                })
                }
                this.setState({
                    isUpdateView: !this.isUpdateView,
                });
            }
        })

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
            if(value) {
                if(value.items.length >0) {
                    value.items.map((item,index) => {
                        let bLv = ' Tòa ' + item.bName + ' - Tầng '  + item.lLv;
                        this.DictLvName[item.lId] = bLv;
                        this.DictLvId[bLv] = item.lId;
                        this.Level[index] = bLv ;
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
                       //    console.log(index);
                        })
                        console.log(this.imei)
                        
                    }
                }
            })
       
    }

    onDeleteTableRow1 = (oldData) => {
    //    console.log(oldData);
        return new Promise((resolve, reject) => {
            UserLoker.unmapLocker(oldData.eCode, oldData.lId, true)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.unmap_user_locker_success) {
                            resolve();
                            this.reloadTable2()
                        }
                    }
                    resolve();
                })
        });
    }

    onDeleteTableRow2  = (oldData) => {
        let ecode = this.EmpSelected
        return new Promise((resolve, reject) => {
            UserLoker.unmapLocker(ecode, oldData.lId, false)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.unmap_user_locker_success) {
                            resolve();
                            this.reloadTable1();
                        }
                    }
                    resolve();
                })
        });

    }

    reloadTable1 = () => {
        this.tableRef1.current && this.tableRef1.current.onQueryChange();
    }

    reloadTable2 = () => {
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
    }

    onRowEmpClick = (event, rowData) => {
       this.setState({
           nameEmpSelected: rowData.eName,
           ecodeEmptySelected: rowData.eCode,
       })
       this.EmpSelected = rowData.eCode;
       this.NameEmpSelected = rowData.eName;
       this.tableRef2.current && this.tableRef2.current.onQueryChange();
    }
  
    render() {

        let headerStyle = {
            color: this.state.headerColor,
        }
        
        return(
            <Fragment>
                <Modal 
                    ref={this.modalRef}
                    type={this.state.modalType}/>
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}>Quản lý sử dụng tủ của nhân viên
                    </h2>
                </div>
                <div style={{display:'flex', margin: '0px 5px'}}>
                    <div style={{flex: '1'}}>
                        <div className="around">
                            <div className= "title-style">
                                <span> 
                                Danh sách người dùng hiện tại
                                </span>
                            </div>
                            <div style={styles.groupSearch}>
                                <div style={styles.searchContainer}>
                                    <div style={styles.searchInput}>
                                        <Input 
                                            title={'Tên nhân viên'} 
                                            onChange = {this.onENameChange}
                                        />  
                                    </div>
                                    <div style={styles.searchInput}>
                                        <Input 
                                            title={'ID nhân sự'} 
                                            onChange = {this.onECodeChange}
                                        />
                                    </div>
                                    <div style={styles.searchInput}>
                                        <Combobox
                                            title={'Bộ phận làm việc'} 
                                            data = {this.Dep}
                                            onChange = {this.onChangDep}
                                        />
                                    </div>
                                </div>  
                                   
                                <div style={styles.searchContainer}>
                                    <div style={styles.searchInput}>
                                        <Combobox
                                        title={'Tòa nhà'} 
                                        data = {this.Build}
                                        onChange = {this.onChangeBuild1}
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
                                        <Button title={'Tìm kiếm'}
                                            onClick={this.onSearchClick1} 
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            <MaterialTable
                            tableRef={this.tableRef1}
                            options={this.optionsTable}
                            columns={this.columnsTable1}
                            data={this.getDataFromServer}
                            icons= {TableIcons}
                            actions={this.actions}
                            editable={{
                                onRowDelete: this.onDeleteTableRow1,
                            }}
                            onRowClick={this.onRowEmpClick}
                            localization={this.localizationsTable1}
                            />
                        </div>
                    </div>
                    <div  style={{flex: '1'}}>
                        <div className="around">
                            <div className= "title-style">
                                <span> 
                                 Danh sách tủ hiện tại của {this.state.nameEmpSelected} có ID Nhân viên: {this.state.ecodeEmptySelected}
                                </span>
                            </div>
                            <div style={styles.groupSearch}>
                                <div style={styles.searchContainer}>
                                    <div style={styles.searchInput}>
                                        <Combobox
                                        title={'Tòa nhà'} 
                                        data = {this.Build}
                                        onChange = {this.onChangeBuild2}
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
                                </div>
                                <div style={styles.searchContainer}>
                                    <div style={styles.searchInput}>
                                        <Input 
                                        title={'Nhãn tủ'} 
                                        onChange = {this.onLabelChange2
                                        }
                                        />
                                    </div>
                                    <div style={styles.searchInput}>
                                        <Button title={'Tìm kiếm'}
                                            onClick={this.onSearchClick2} />
                                    </div>
                                    <div style={styles.searchInput}>
                                    </div>
                                </div>
                            </div>
                        
                            <MaterialTable
                            tableRef={this.tableRef2}
                            options={this.optionsTable}
                            columns = {this.columnsTable2}
                            data={this.getLokerDataFromServer}
                            icons= {TableIcons}
                            localization={this.localizationsTable2}
                            editable={{
                                // onRowUpdate: this.onEditTableRow,
                                 onRowDelete: this.onDeleteTableRow2,
                            }}
                            />
                        </div>
                    </div>
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
    },

    groupSearch: {
        marginBottom: '30px'
    }
}