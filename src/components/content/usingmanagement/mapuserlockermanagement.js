import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import UserLoker from '../../../core/user';
import ManageLoker from '../../../core/locker';
import TableIcons from '../../common/materialicon';
import Department from '../../../core/department';
import Input from '../../common/input'
import Button from '../../common/button'
import Combobox from '../../common/combobox'
import Building from '../../../core/building'
import Level from '../../../core/level'
import Controller from '../../../core/controller'
import Checkbox from '../../common/checkbox'
import FButton from '../../common/floatbutton'
import Done from '@material-ui/icons/Done'
import Cancel from '@material-ui/icons/ClearOutlined'
import Modal from '../../common/modal'

export default class MapUserLockerManagement extends React.Component {
    dictDev ={};
    Dep = [];
    dictDid = {};
    DidInput = 0;
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
    ENameInput = '';
    ECodeInput = '';
    LabelInput = '';
    LabelInputTable2 = '';
    IsGroupInput1 = 0;
    IsGroupInput2 = 0;
    listEmployeeChecked = [];
    listLockerChecked=[];

    constructor(props) {
        super(props);
        this.state = {
            isUpdateView: false,
            headerColor: 'black',
            counterLoker: 0,
            couterUser: 0,
            modalType: '',
        };
        this.tableRef1 = React.createRef();
        this.tableRef2 = React.createRef();
        this.modalRef = React.createRef();
    }

    optionsTable = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
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
        
    }

    columnsTable1 = [
        {
            title: 'Họ và tên', 
            field: 'name',
            render: rowData => {
            if (this.listEmployeeChecked.includes(rowData.eId))
            {
                return (
                    <Checkbox checked={true}
                        title={rowData.name}
                        data={rowData}
                        onChange={this.onEmployeeChecked}/>
                )   
            }
            else{
                return (
                    <Checkbox checked={false}
                        title={rowData.name}
                        data={rowData}
                        onChange={this.onEmployeeChecked}/>
                )   
            }
            }
        },
        {
             title: 'ID nhân sụ', 
             field: 'eCode'
         },
        { 
            title: 'Bộ phận làm việc',
            field: 'dId', 
            render: rowData => {
                return(
                    <span>
                        {this.dictDev[rowData.dId]}
                    </span>
                )
            }
        },
        {
            title: 'Tình trạng phân tủ', 
            field:'gStatus',
            render: rowData => {
                if(rowData.gStatus === 1) {
                    return(
                        <span style={{color: 'green'}}>
                            Đã được phân tủ
                        </span>
                    )
                }
                else {
                    return(
                        <span style={{color: 'red'}}>
                            Chưa được phân tủ
                        </span>
                    )
                }
            }
        },
    
    ]

    columnsTable2 = [
        {
            title: 'Tòa',
            field: 'bName',
            render: rowData => {
                if (this.listLockerChecked.includes(rowData.lId))
                {
                    return (
                        <Checkbox checked={true}
                            title={rowData.bName}
                            data={rowData}
                            onChange={this.onLockerChecked}/>
                    )   
                }
                else{
                    return (
                        <Checkbox checked={false}
                            title={rowData.bName}
                            data={rowData}
                            onChange={this.onLockerChecked}/>
                    )   
                }
                }
        },
        {
            title: 'Tầng',
            field: 'lLv', render: rowData =>
            {
                return(
                    <span> Tầng {rowData.lLv} </span>
                )
            }
        },
        {
            title: 'Tủ',
            field: 'lLb'
        },
        {
            title: 'Tình trạng phân tủ',
            field: 'gName',
            render: rowData => {
                if(rowData.gName === 'Đã được phân nhóm') {
                    return(
                    <span style={{color: 'green'}}> 
                        Đã được phân tủ
                    </span>
                    )
                }
                else {
                    return(
                        <span style={{color: 'red'}}> 
                            Chưa được phân tủ
                        </span>
                    )
                }
            }
        }
    ]

    addClickNewMapLocker = () => {
        this.setState({
            modalType: 'addNewMapLocker',
        })

        let sendData = {
            dataListEmp: this.listEmployeeChecked,
            dataListLocker: this.listLockerChecked,
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFail
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddNewMapLocker',
        })

        let sendData={
            callback: this.reloadDataTable,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
        
    }

    onModalCallFail =() => {
        this.setState({
            modalType: 'failAddNewMapLocker',
        })

        let sendData = {
           callback: this.reloadDataTable,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    reloadDataTable =() => {
        this.listLockerChecked = [];
        this.listEmployeeChecked = [];
        this.setState({
            counterLoker: 0,
            couterUser: 0,
        })
        this.tableRef1.current && this.tableRef1.current.onQueryChange();
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
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

    onEmployeeChecked = (data, status) => {
        if (status) {
            this.listEmployeeChecked.push(data.eId);
            this.setState((state)=>({
                couterUser: state.couterUser +1 
            }));
        }
        else{
            let eIndex = this.listEmployeeChecked.findIndex(value => {
                return value === data.eId;
            })

            this.listEmployeeChecked.splice(eIndex, 1);
            this.setState((state)=>({
                couterUser: state.couterUser - 1
            }));
        }
    
   //    console.log(this.listEmployeeChecked);
    }

    onLockerChecked = (data, status) => {
        if (status) {
            this.listLockerChecked.push(data.lId);
            this.setState((state)=>({
                counterLoker: state.counterLoker + 1
            }));
        }
        else{
            let lIndex = this.listLockerChecked.findIndex(value => {
                return value === data.lId;
            })

            this.listLockerChecked.splice(lIndex, 1);
            this.setState((state)=>({
                counterLoker: state.counterLoker - 1
            }));
        }
       // console.log(this.listLockerChecked);

    }


    onChangeGroup1 = (value) => {
        if( value === 'Đã được phân tủ') {
            this.IsGroupInput1 = 2;
        }
        else {
            this.IsGroupInput1 = 1;
        }
    }

    onChangeDep = (value) => {
        this.DidInput = this.dictDid[value];
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

    onChangeGroup2 = (value) => {
        if( value === 'Đã được phân tủ') {
            this.IsGroupInput2 = 2;
        }
        else {
            this.IsGroupInput2 = 1;
        }
    }

    onSearchClick1 = () => {
        this.tableRef1.current && this.tableRef1.current.onQueryChange();
    }

    onSearchClick2 = () => {
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
        // if (typeof this.tableRef.current !== 'undefined'){
        //     this.tableRef.current.onQueryChange();
        // }
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
            UserLoker.getUser(this.DidInput, this.ENameInput, this.ECodeInput, '', '', 0, 0, this.IsGroupInput1, query.page +1)
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

    getLokerDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
            ManageLoker.getLocker(this.BIdInput, this.LvIdInput, this.BLvIInput, this.LabelInputTable2, 0, this.IsGroupInput2, query.page +1)
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
        this.setState({
            isShowIcons: !this.state.isShowIcons,
        })
      //  console.log('componentDidMount');
        Department.getDepartment()
            .then(value => {
                if(value.items) {
                    if(value.items.length >0) {
                        value.items.map((item, index) => {
                            {this.dictDev[item.dId] = item.dName}
                            {this.Dep[index] = item.dName}
                            {this.dictDid[item.dName] = item.dId}
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
                   // console.log(this.imei)
                    
                }
            }
        })
    }

    addNewMapLocker = () => {

    }
    
    render() {
        // console.log('render');
        // console.log(this.state.counterLoker);
        // console.log(this.state.couterUser);

        // console.log(this.state.counter)
        let headerStyle = {
            color: this.state.headerColor,
        }     
        let Icons = null;
        if(this.state.counterLoker >= 1 && this.state.couterUser >= 1 ){
            Icons = (
                <div>
                    <FButton title={'Đăng ký tủ cho nhân viên'}
                        icon={<Done/>}
                        position={['auto', 20, 'auto', 100]} 
                        onClick={this.addClickNewMapLocker}
                        />
                    <FButton title={'Hủy bỏ'}
                        icon={<Cancel/>}
                        position={['auto', 20, 'auto', 200]} 
                        onClick={this.reloadDataTable}
                        />
    
                </div>
            )  
    
        }
            return(
            <Fragment>
                <Modal 
                type={this.state.modalType}
                ref={this.modalRef}
                />
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Đăng ký sử dụng tủ cho nhân viên
                    </h2>
                </div>
                
                <div style={{display:'flex', margin: '0px 5px'}}>
                    <div style={{flex: '1'}}>
                        <div className ="around">
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
                                            onChange = {this.onChangeDep}
                                        />
                                    </div>
                                </div>
                                <div style={styles.searchContainer}>
                                    <div style={styles.searchInput}>
                                        <Combobox
                                            title={'Tình trạng phân tủ'} 
                                            data = {[
                                                'Đã được phân tủ',
                                                'Chưa được phân tủ'
                                            ]}
                                            onChange = {this.onChangeGroup1}
                                        />
                                    </div>
                                    <div style={styles.searchInput}>
                                        <Button 
                                            title={'Tìm kiếm'}
                                            onClick={this.onSearchClick1}
                                        />
                                    </div>
                                    <div style={styles.searchInput}>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <MaterialTable
                                tableRef={this.tableRef1}
                                options={this.optionsTable}
                                columns={this.columnsTable1}
                                data={this.getDataFromServer}
                                icons= {TableIcons}
                            />
                        </div>
                    </div>
                    <div  style={{flex: '1'}}>
                        <div className ="around">
                            <div className= "title-style">
                                <span> 
                                 Danh sách tủ hiện tại
                                </span>
                            </div>
                            <div style={styles.groupSearch}>
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
                                        <Combobox
                                            title={'Tình trạng phân tủ'} 
                                            data = {[
                                                'Đã được phân tủ',
                                                'Chưa được phân tủ'
                                            ]}
                                            onChange = {this.onChangeGroup2}
                                        />
                                    </div>
                                    <div style={styles.searchInput}>
                                        <Button title={'Tìm kiếm'}
                                            onClick={this.onSearchClick2}
                                        />
                                    </div>
                                </div>
                            
                            </div>
                        
                            <MaterialTable
                                tableRef={this.tableRef2}
                                options={this.optionsTable}
                                columns = {this.columnsTable2}
                                data={this.getLokerDataFromServer}
                                icons= {TableIcons}
                            />
                        </div>>
                    </div>
                </div>
                {Icons}
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