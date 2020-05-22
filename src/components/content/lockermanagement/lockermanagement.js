import React, { Fragment } from 'react';
import TableIcons from '../../common/materialicon'
import Locker from '../../../core/locker'
import Building from '../../../core/building'
import Level from '../../../core/level'
import Controller from '../../../core/controller';
import Combobox from '../../common/combobox';
import Input from '../../common/input';
import Button from '../../common/button';
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'
import LockOpen from '@material-ui/icons/LockOpen'
import Refresh from '@material-ui/icons/Refresh'
import BugReportRounded from '@material-ui/icons/BugReportRounded'
import DoneAllOutlined from '@material-ui/icons/DoneAllOutlined'
import BuildRounded from '@material-ui/icons/BuildRounded'
import NoMeetingRoomRounded from '@material-ui/icons/NoMeetingRoomRounded'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {red} from '@material-ui/core/colors'
import Modal from '../../common/modal'

export default class LockerManagement extends React.Component {
    rBuildingIdInput = 0;
    rLevelIdInput = 0;
    rImeiInput = '';
    rLabelInput = '';
    lPage = [];
    bDatas = [];
    lDatas = [];
    cDatas = [];
    array1 = {};
    DictBName = {};
    Build = [];
    DictBId = {};
    DictLvName = {};
    DictLvId = {};
    Level = [];
    DictBLvIName = {};
    DictBLvIId = {};
    Imei = [];
    Test1 = [];
    Lk = [];

    BIdInput= 0;
    LvIdInput= 0;
    BLvIInput= '';
    LabelInput= '';
    Lockers = [];

    constructor(props) {
        super(props);
        this.state = {
            isShowLock: false,
            PageLokers1: [],
            PageLokers2: [],
            modalType: '',
            background: 'rgb(76, 175, 80)' ,
        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();
    }

    onChangeBLvI = (value) => {
        this.BLvIInput=this.DictBLvIId[value]
    }

    onChangeBLevel = (value) => {
        this.LvIdInput = this.DictLvId[value]
    }

    onChangeBuild = (value) => {
        this.BIdInput= this.DictBId[value]
    }

    onLabelChange = (value) => {
       this.LabelInput = value;
    }

    onSearchClick = () => {
        this.setState({
            isShowLock: true,
        })
        Locker.getManageLocker(this.BIdInput, this.LvIdInput, this.BLvIInput, this.LabelInput, 1)
        .then(value => {
            if (value.items !== undefined) {
                if (value.items.length > 0) {
                    // value.items.map((item, index) => {
                    //     this.Lockers[index] = item;
                        
                    // })
                    this.setState({
                        PageLokers1: value.items,
                    })
                }
                
            }
        })
       
    }

    handleClick = (e, data) =>{
        console.log(data);
    }

    handleClickLockOpen = (e, data) => {
       // console.log('openLocker');
        
        this.setState({
            modalType: 'lockerOpen',
        })

        let senData = {
            locker: data,
            callback: this.lockerOpenSuccessCall
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    lockerOpenSuccessCall =()=> {
        this.setState({
            modalType: 'successLockerOpen',
        })

        let senData = {
            //locker: data,
            //callback: this.lockerOpenSuccessCall
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    handleClickLockerFree = (e, data) => {
        // console.log('openLocker');
         
         this.setState({
             modalType: 'lockerFree',
         })
 
         let senData = {
             locker: data,
             callback: this.lockerFreeSuccessCall,
             callbackfail: this.lockerFreeFailCall,
         }
 
         this.modalRef.current && this.modalRef.current.onModalShow(senData)
     }
 
     lockerFreeSuccessCall =()=> {
         this.setState({
             modalType: 'successLockerFree',
         })
 
         let senData = {
             //locker: data,
             //callback: this.lockerOpenSuccessCall
         }
 
         this.modalRef.current && this.modalRef.current.onModalShow(senData)
     }

     lockerFreeFailCall = () => {
        this.setState({
            modalType: 'failLockerFree',
        })

        let senData = {
            //locker: data,
            //callback: this.lockerOpenSuccessCall
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
     }
    
    handleClickConfirmLocker = (e, data) => {
        this.setState({
            modalType: 'confirmLocker',
        })

        let senData = {
            locker: data,
            callback: this.lockerConfirmSuccessCall,
            callbackfail: this.lockerConfirmFailCall,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    lockerConfirmSuccessCall =()=> {
        this.setState({
            modalType: 'successConfirmLocker',
        })

        let senData = {
            //locker: data,
            //callback: this.lockerOpenSuccessCall
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    lockerConfirmFailCall = () => {
       this.setState({
           modalType: 'failConfirmLocker',
       })

       let senData = {
           //locker: data,
           //callback: this.lockerOpenSuccessCall
       }

       this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }
 

    handleClickDisableLocker =(e, data) => {
        this.setState({
            modalType: 'disableLocker',
        })

        let senData = {
            locker: data,
            callback: this.disableLockerSuccessCall,
            callbackfail: this.disableLockerFailCall,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    disableLockerSuccessCall =()=> {
        this.setState({
            modalType: 'successDisableLocker',
        })

        let senData = {
            //locker: data,
            callback: this.onSearchClick,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    disableLockerFailCall = () => {
       this.setState({
           modalType: 'failDisableLocker',
       })

       let senData = {
           //locker: data,
           //callback: this.lockerOpenSuccessCall
       }

       this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }
 
    handleClickEnableLocker = (e, data) => {
        this.setState({
            modalType: 'enableLocker',
        })

        let senData = {
            locker: data,
            callback: this.EnableLockerSuccessCall,
            callbackfail: this.EnableLockerFailCall,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    EnableLockerSuccessCall =()=> {
        this.setState({
            modalType: 'successEnableLocker',
        })

        let senData = {
            //locker: data,
            callback: this.onSearchClick,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    EnableLockerFailCall = () => {
       this.setState({
           modalType: 'failEnableLocker',
       })

       let senData = {
           //locker: data,
           //callback: this.lockerOpenSuccessCall
       }

       this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }
 
    handleClickReportLocker = (e, data) => {
        this.setState({
            modalType: 'reportLocker',
        })

        let senData = {
            locker: data,
            callback: this.ReportLockerSuccessCall,
            callbackfail: this.ReportLockerFailCall,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    ReportLockerSuccessCall =()=> {
        this.setState({
            modalType: 'successReportLocker',
        })

        let senData = {
            //locker: data,
            callback: this.onSearchClick,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    ReportLockerFailCall = () => {
       this.setState({
           modalType: 'failReportLocker',
       })

       let senData = {
           //locker: data,
           //callback: this.lockerOpenSuccessCall
       }

       this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }
    
    componentDidMount() {
        Building.getBuilding()
            .then(value => {
                if (value) {
                    if (value.items.length > 0) {
                        value.items.map((item, index) => {
                            this.DictBName[item.bId] = item.bName;
                            this.DictBId[item.bName] = item.bId;
                            this.Build[index] = item.bName;
                        })
                    }
                }
            })

        Level.getLevel()
            .then(value => {
                if (value) {
                    if (value.items.length > 0) {
                        value.items.map((item, index) => {
                            let bLv = ' Tòa ' + item.bName + ' - Tầng ' + item.lLv;
                            this.DictLvName[item.lId] = bLv;
                            this.DictLvId[bLv] = item.lId;
                            this.Level[index] = bLv;
                        })

                    }
                }
            })

        Controller.getController()
            .then(value => {
                if (value) {
                    if (value.items.length > 0) {
                        value.items.map((item, index) => {
                            let bLvImei = ' Tòa ' + item.bName + ' - Tầng ' + item.lLv + '- quản lý cụm tủ: ' + item.sLabel + ' đến ' + item.eLabel;
                            this.DictBLvIName[item.imei] = bLvImei;
                            this.DictBLvIId[bLvImei] = item.imei;
                            this.Imei[index] = bLvImei;
                        })
                    }
                }
            })
    }

    onMouseLeaveLocker = () => {
        this.setState({
            background: 'yellow'
        })
    }

    render() {
        let cot = 0;
        let hang = 0;
        let ManageLocker1 = [];
        let ManageLocker2 = [];
        let pagelockers1= this.state.PageLokers1;
        let counter = 0;
        let counter2 = 0;
        let lStatus = null;
        let lHealth = null;
        let lStatus2 = null;
        let lHealth2 = null;
        let styleChoose= styles.locker


        for (hang = 0; hang < 3; hang++) 
        {
            for (cot = 0; cot < 7; cot++) 
            {
                pagelockers1.map((item, index) =>
                {
                    if ( item.lRw === hang && item.lCl === cot && item.lPg === 1) {
                        counter = 1
                        if(item.aStatus === 'FREE') {
                            lStatus = <span>Tủ đang trống</span>
                        }
                        else if(item.aStatus === 'DISABLED') {
                            lStatus = <span> Tủ bị vô hiệu hóa</span>
                            styleChoose = styles.itemDisabled
                        }
                        else if (item.aStatus === 'OCCUPIED'){
                            lStatus = <span> Tủ đang được sử dụng</span>
                            styleChoose = styles.itemOccuppied
                        }
                        if(item.health === 'ERROR') {
                            lHealth = <span> Tủ có lỗi kĩ thuật</span>
                        }
                        else if(item.health === 'WORKING') {
                            lHealth = <span></span>
                        }
                        ManageLocker1.push(
                        <div>
                            <ContextMenuTrigger id={item.lId}>
                                <div style={styleChoose}>
                                    <span>{item.lLb}</span>
                                    <span>
                                        {lStatus}
                                    </span>
                                    <span>{item.gName}</span>
                                    <span>{lHealth}</span>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenu id={item.lId}>
                                <MenuItem data={item} onClick={this.handleClickLockOpen}>
                                    <LockOpen style={{color: red[500], paddingRight: '10px'}}/> Mở tủ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickLockerFree}>
                                    <Refresh  style={{color: red[500], paddingRight: '10px'}} /> Giải phóng tủ
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem data={item} onClick={this.handleClickConfirmLocker}>
                                    <BuildRounded  style={{color: red[500], paddingRight: '10px'}}/> Xác nhận mở tại chỗ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickDisableLocker}>
                                    <NoMeetingRoomRounded  style={{color: red[500], paddingRight: '10px'}}/> Vô hiệu hóa tủ
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem data={item} onClick={this.handleClickEnableLocker}>
                                    <DoneAllOutlined style={{color: red[500], paddingRight: '10px'}}/> Tái kích hoạt tủ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickReportLocker}>
                                    <BugReportRounded  style={{color: red[500], paddingRight: '10px'}}/> Báo lỗi tủ
                                </MenuItem>
                            </ContextMenu>
                           
                        </div>
                        );
                    }
                })
                if(counter === 0) {
                    ManageLocker1.push(
                        <div>
                        </div>
                    )
                }
                counter = 0;
                styleChoose= styles.locker
            }

        }


        for (hang = 0; hang < 3; hang++) 
        {
            for (cot = 0; cot < 7; cot++) 
            {
                pagelockers1.map((item, index) =>
                {
                    if ( item.lRw === hang && item.lCl === cot && item.lPg === 2) {
                        counter2 = 1;
                        if(item.aStatus === 'FREE') {
                            lStatus2 = <span>Tủ đang trống</span>
                        }
                        else if(item.aStatus === 'DISABLED') {
                            lStatus2 = <span> Tủ bị vô hiệu hóa</span>
                            styleChoose = styles.itemDisabled;
                        }
                        else if (item.aStatus === 'OCCUPIED'){
                            lStatus2 = <span> Tủ đang được sử dụng</span>
                            styleChoose = styles.itemOccuppied
                        }

                        if(item.health === 'ERROR') {
                            lHealth2 = <span> Tủ có lỗi kĩ thuật</span>
                        }
                        else if (item === 'WORKING'){
                            lHealth2 = <span> </span>
                        }
                        ManageLocker2.push(
                        <div>
                            <ContextMenuTrigger id={item.lId}>
                                <div style={styleChoose}>
                                    <span>{item.lLb}</span>
                                    <span>
                                        {lStatus2}
                                    </span>
                                    <span>{item.gName}</span>
                                    <span>{lHealth2}</span>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenu id={item.lId}>
                                <MenuItem data={item} onClick={this.handleClickLockOpen}>
                                    <LockOpen style={{color: red[500], paddingRight: '10px'}}/> Mở tủ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickLockerFree}>
                                    <Refresh  style={{color: red[500], paddingRight: '10px'}} /> Giải phóng tủ
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem data={item} onClick={this.handleClickConfirmLocker}>
                                    <BuildRounded  style={{color: red[500], paddingRight: '10px'}}/> Xác nhận mở tại chỗ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickDisableLocker}>
                                    <NoMeetingRoomRounded  style={{color: red[500], paddingRight: '10px'}}/> Vô hiệu hóa tủ
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem data={item} onClick={this.handleClickEnableLocker}>
                                    <DoneAllOutlined style={{color: red[500], paddingRight: '10px'}}/> Tái kích hoạt tủ
                                </MenuItem>
                                <MenuItem data={item} onClick={this.handleClickReportLocker}>
                                    <BugReportRounded  style={{color: red[500], paddingRight: '10px'}}/> Báo lỗi tủ
                                </MenuItem>
                            </ContextMenu>
                        </div>
                        
                        );
                    }
                })
                if(counter2 === 0) {
                    ManageLocker2.push(
                        <div>
                        </div>
                    )
                }
                counter2 = 0;
                styleChoose= styles.locker
            }
        }

        return (
            <Fragment>
                <Modal 
                type={this.state.modalType}
                ref={this.modalRef}
                />
                <div style={{ margin: '30px 10px 40px 20px' }}>
                    <h2>
                        Quản lý tủ
                  </h2>
                </div>
                <div className="around">

                    <div className="title-style">
                        <span>
                            Danh sách các tòa nhà trong hệ thống
                            </span>
                    </div>
                    <div className="div-control" style={{ display: 'flex' }}>
                        <div style={styles.searchInput}>
                        <Combobox
                            title={'Tòa nhà'}
                            data={this.Build}
                            onChange={this.onChangeBuild}
                        />
                        </div>
                        <div style={styles.searchInput}>
                        <Combobox
                            title={'Tầng'}
                            data={this.Level}
                            onChange={this.onChangeBLevel}

                        />
                        </div>
                        <div style={styles.searchInput}>
                        <Combobox
                            title={'Thiết bị quản lý'}
                            data={this.Imei}
                            onChange={this.onChangeBLvI}
                        />
                        </div>
                        <div style={styles.searchInput}>
                        <Input
                            title={'Nhãn tủ'}
                            onChange={this.onLabelChange
                            }
                        />
                        </div>
                        <div style={styles.searchInput}>
                             
                        <Button
                            title={'Tìm kiếm'}
                            onClick={this.onSearchClick}
                        />
                        </div>
                    </div>

                    <div style={styles.divLock}>
                        {ManageLocker1.map((item) => {
                            return (
                                <div>{item}</div>
                            )
                        })}
                    </div>
                    <div style={styles.divLock}>
                        {ManageLocker2.map((item) => {
                            return (
                                <div>{item}</div>
                            )
                        })}
                    </div>
                </div> 
            </Fragment>
        )
    }
}

const styles = {

    locker: {
        border: '1px solid white',
        fontSize: '15px',
        padding: '10px',
        textAlign: 'center',
        minHeight: '120px',
        background: 'rgb(76, 175, 80)',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    divNull: {
        border: '1px solid white',
        fontSize: '15px',
        padding: '10px',
        textAlign: 'center',
        minHeight: '120px',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },


    divLock: {
         gridTemplateColumns: 'repeat(7, 1fr)',
         gridTemplateRows: 'repeat(3, 1fr)',
        display: 'grid',
        marginTop: '30px',
    },

    searchInput: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },

    itemOccuppied: {
        border: '1px solid white',
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
        minHeight: 120,
        background: '#e30613',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    itemFree: {
        border: '1px solid white',
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
        minHeight: 120,
        background: '#4caf50',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    itemDisabled: {
        border: '1px solid white',
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
        minHeight: 120,
        background: '#ccc',
        color: 'black',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }



}