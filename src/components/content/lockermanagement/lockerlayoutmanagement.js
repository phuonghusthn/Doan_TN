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
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {red} from '@material-ui/core/colors'
import Modal from '../../common/modal'

export default class LockerLayoutManagement extends React.Component {
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
        //Locker.getLocker(this.BIdInput, this.LvIdInput, this.BLvIInput, this.LabelInput, 0, 0, 1)
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
 
    handleClickDeleteLocker = (e, data) => {
        this.setState({
            modalType: 'deleteLocker',
        })

        let senData = {
            locker: data,
            callback: this.DeleteLockerSuccessCall,
            callbackfail: this.DeleteLockerFailCall,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    DeleteLockerSuccessCall =()=> {
        this.setState({
            modalType: 'successDeleteLocker',
        })

        let senData = {
            //locker: data,
            callback: this.onSearchClick,
        }

        this.modalRef.current && this.modalRef.current.onModalShow(senData)
    }

    DeleteLockerFailCall = () => {
       this.setState({
           modalType: 'failDeleteLocker',
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

    render() {
        let cot = 0;
        let hang = 0;
        let ManageLocker1 = [];
        let ManageLocker2 = [];
        let pagelockers1= this.state.PageLokers1;
        let counter = 0;
        let counter2 = 0;

        for (hang = 0; hang < 3; hang++) 
        {
            for (cot = 0; cot < 7; cot++) 
            {
                pagelockers1.map((item, index) =>
                {
                    if (item.lPg === 1 && item.lRw === hang && item.lCl === cot) {
                        counter = 1
                       
                        ManageLocker1.push(
                        <div>
                            <ContextMenuTrigger id={item.lId}>
                                <div style={styles.locker}>
                                    <span>{item.lLb}</span>
                                    <span>
                                        Số thứ tự: {item.lNum}
                                    </span>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenu id={item.lId}>
                                <MenuItem data={item} onClick={this.handleClickDeleteLocker}>
                                    <TableIcons.Delete style={{color: red[500], paddingRight: '10px'}}/> Xóa tủ
                                </MenuItem>
                            </ContextMenu>
                           
                        </div>
                        );
                    }
                })
                if(counter === 0) {
                    ManageLocker1.push(
                        <div style={styles.locker}>
                        </div>
                    )
                }
                counter = 0;
            }

        }

        for (hang = 0; hang < 3; hang++) 
        {
            for (cot = 0; cot < 7; cot++) 
            {
                pagelockers1.map((item, index) =>
                {
                    if ( item.lPg === 2 && item.lRw === hang && item.lCl === cot) {
                        counter2 = 1
                        ManageLocker2.push(
                        <div>
                            <ContextMenuTrigger id={item.lId}>
                                <div style={styles.locker}>
                                    <span>{item.lLb}</span>
                                    <span>
                                        Số thứ tự:  {item.lNum}
                                    </span>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenu id={item.lId}>
                                <MenuItem data={item} onClick={this.handleClickDeleteLocker}>
                                    <TableIcons.Delete style={{color: red[500], paddingRight: '10px'}}/> Xóa tủ
                                </MenuItem>
                            </ContextMenu>
                        </div>
                        
                        );
                    }
                })
                if(counter2 === 0) {
                    ManageLocker2.push(
                        <div style={styles.locker}>
                        </div>
                    )
                }
                counter2 = 0;
            }
        }

        let layoutLocker = null;
        if(this.state.isShowLock === true) {
            layoutLocker = (
                <div>
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
            )
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
                    <div>
                        {layoutLocker}
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
        background: 'rgb(227, 6, 19)',
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


}