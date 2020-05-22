import React, { Fragment } from 'react'
import Button from '../../common/button'
import MaterialTable from 'material-table';
import UserLoker from '../../../core/user';
import ManageLoker from '../../../core/locker';
import TableIcons from '../../common/materialicon';
//import Department from '../../../core/department';
import Input from '../../common/input'
import Combobox from '../../common/combobox'
import Building from '../../../core/building'
import Level from '../../../core/level'
import Controller from '../../../core/controller'
import { red } from '@material-ui/core/colors';
import FButton from '../../common/floatbutton'
import Cancel from '@material-ui/icons/ClearOutlined'
import Done from '@material-ui/icons/Done'
import Checkbox from '../../common/checkbox'
import Modal from '../../common/modal'
import ResponseCode from '../../../staticresources/responsecode'
import User from '../../../core/user'
import CheckBox from '../../common/checkbox'

export default class AddLoker extends React.Component{

    
    Build = [];
    DictBId = {};
    BIdInput = 0;
    DictBName = {};
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
    //LabelInput = '';
    LabelInputTable2 = '';
    //IsGroupInput1 = 0;
    IsGroupInput2 = 0;
    listLockerChecked=[];
    listEmployeeChecked = [];
    checkedReuse = false;
 
    constructor(props){
        super(props);
        this.state={
            counterLoker: 0,
            modalType: '',
            isShowMapExisted: false,
        }
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
        console.log(this.listLockerChecked);

    }

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

    onSearchClick2 = () => {
        this.tableRef2.current && this.tableRef2.current.onQueryChange();
        // if (typeof this.tableRef.current !== 'undefined'){
        //     this.tableRef.current.onQueryChange();
        // }
    }

    onLabelChange2 = (value) => {
        this.LabelInputTable2 = value;
    }

    componentDidMount(){
        //console.log(this.props)
       // this.listEmployeeChecked.push()
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
                    //console.log(this.imei)
                    
                }
            }
        })
    }

    onAcceptClick = () => {
        let ecodeEmpSelected = this.props.data.empData.eCode;
        let listLocker = this.listLockerChecked;
        return new Promise((resolve, reject) => {
            User.mapExistedLocker(ecodeEmpSelected, listLocker, this.checkedReuse)
            .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.map_user_locker_success)
                        {
                            resolve();
                            this.props.data.callbackMapSuccess();
                           // this.props.data.callbackfail();
                        }
                        else {
                            this.props.data.callbackMapFail();
                        }
                       
                    }
                    resolve();
                })
        });

    } 

    onCancelClick = () => {
        //this.props.data.callback('xin chào');
        this.props.onCancelClick();
    }

    onClickMapExistedLocker = () => {
        this.setState({
            isShowMapExisted: true,
        })
        
        // let sendData ={
        //     lockers: this.listLockerChecked,
        //     empSelected: this.props.data.empData,
        //     callback: this.successcall,
        //     callbackfail: this.failcall,
        //     callbackclose: this.callbackclose
        // }
        // this.modalRef.current && this.modalRef.current.onModalShow(sendData)    
    }

    callbackclose = () => {
        this.props.data.callbackclose()
    }

    onCheckedReuse = (data, status) => {
        if(status) {
            this.checkedReuse = true;
        }
        else {
            this.checkedReuse = false;
        }
    }

    // successcall =() =>  {
    //     this.setState({
    //         modalType: 'successMapExistedLocker'
    //     })
        
    //     let sendData ={
    //         // locker: this.listLockerChecked,
    //         // empSelected: this.props.data.empData,
    //         callback: this.successmodalcall
            
    //     }
    //     this.modalRef.current && this.modalRef.current.onModalShow(sendData)    
    // }

    // successmodalcall  = () => {
    //     this.setState({
    //         modalType: ''
    //     })
    //     this.props.data.callback()
    // }

    // failcall =() =>  {
    //     this.setState({
    //         modalType: 'failMapExistedLocker'
    //     })
        
    //     let sendData ={
    //         // locker: this.listLockerChecked,
    //         // empSelected: this.props.data.empData,
    //         // callback: this.successcall
            
    //     }
    //     this.modalRef.current && this.modalRef.current.onModalShow(sendData)    
    // }

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
    render(){
        let elm = null;
        if( this.state.counterLoker >= 1){
        elm =(
        <FButton 
        icon ={<Done />}
        title={'Đăng ký tủ nhân viên'}
        position={[ 'auto', 20, 'auto', 200]}
        onClick={this.onClickMapExistedLocker}
        />
        ) 
        }
        let fragment = null;
        if( this.state.isShowMapExisted === true) {
            fragment=(
                <Fragment>
                <div style={styles.TitleModal} >
                    Đăng ký tủ nhân viên 
                </div>
                <div>
                    <div style={styles.information}>Nhân viên: {this.props.data.empData.eName}</div>
                    <div style={styles.information}>ID Nhân viên: {this.props.data.empData.eCode}</div>
                    <div style={styles.information}>Số lượng nhân tủ: {this.listLockerChecked.length}</div>
                    <CheckBox 
                    checked={false}
                    onChange ={ this.onCheckedReuse}
                    title={'Cho phép nhóm các nhân viên cũ tiếp tục sử dụng các tủ đã được phân trước đó và ngược lại' }                   
                    />
                </div>
                <div style={styles.GroupButton}>
                    <div style={styles.ButtonStyle}>
                        <Button onClick={this.onCancelClick}
                        title={'Hủy'}/>
                    </div>
                    <div style={styles.ButtonStyle}>
                        <Button 
                        title={'Đồng ý'}
                        onClick={this.onAcceptClick}
                        />
                    </div>
                </div>
            </Fragment>
            )
        }
        else {
            fragment = (
                <Fragment>
                  <div className ="around" style={styles.aroundStyle}>
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
                      <div style={{height: '450px'}} >
                      <MaterialTable
                          tableRef={this.tableRef2}
                          options={this.optionsTable}
                          columns = {this.columnsTable2}
                          data={this.getLokerDataFromServer}
                          icons= {TableIcons}
                      />
                      </div>
                      
                  </div>  
                  <FButton
                      icon = {<Cancel/>}
                      title ={'Hủy'}
                      position={[ 'auto', 20, 'auto', 100]}
                      onClick={this.onCancelClick}
                  />
                  {elm}
                  
            </Fragment>
            )
        }
        return(
            <div>
                {fragment}

            </div>
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
    },

    aroundStyle: {
        margin: '15px 0px',
        width: '100%',
        flex: '1 1 0%',
       // border-radius: 0.3vw
        height: '100%',
        overflow: 'auto',
        boxSizing: 'border-box',
        alignSelf: 'self-start',
    },
    information: {
        padding: '10px',
        fontWeight: 'bold',
    },

    ButtonStyle: {
        width: '47%',
    },

    TitleModal: {
        fontSize: '21px',
        fontWeight: 600,
        color: 'rgb(227, 6, 19)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30px',
        paddingTop: '25px',
        paddingBottom: '15px',
        textAlign: 'center'
    },

    GroupButton: {
        marginTop: '50px',
        height: '70px',
        borderTop: '1px solid red',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

}