import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Button from '../../common/button';
import Building from '../../../core/building';
import ResponseCode from '../../../staticresources/responsecode'
import {blue} from '@material-ui/core/colors'
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'
import Modal from '../../common/modal'

export default class BuildingManagement extends React.Component {

    AddrInput = '';
    BuildInput = '';

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
            modalType: '',
        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();
       
    }

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            firstTooltip: 'Trang đầu',
            lastTooltip: 'Trang cuối',
        },

        body: {
            editRow:{
                deleteText: 'Bạn có muốn xóa tòa nhà này ra khỏi hệ thống?',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý'
            }
        }
    }

    columnsTable = [
        {
            title: 'Tòa nhà',
            field: 'bName'
        },
        {
            title: 'Địa chỉ',
            field: 'bAddr'
        },
        {
            title: 'Thông tin mô tả',
            field: 'bDes'
        },
    ]

    optionsTable = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
        actionsColumnIndex: -1,
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

    onChangeBInput = (value) => {
        this.BuildInput = value;
    }

    onChangeAddrInput = (value) => {
        this.AddrInput = value;
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


    onEditTableRow = (newData, oldData) => {
        return new Promise((resolve, reject) => {
            Building.editBuilding(oldData.bId, newData.bName, newData.bAddr, newData.bDes)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_building_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });
    }

    onDeleteTableRow =(oldData) => {
        // return new Promise((resolve, reject) => {
        //     Building.editBuilding(oldData.bId)
        //         .then(res => {
        //             if (res) {
        //                 if (res.code && res.code === ResponseCode) {
        //                     resolve();
        //                 }
        //             }
        //             resolve();
        //         })
        // });
    }

    onClickAdd =() => {
        this.setState({
            modalType: 'addBuilding'
        })

        let sendData = {
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFail
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddBuilding',
        })

        let sendData={
            callback: this.reloadDataTable,
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);

    }

    onModalCallFail =() => {
        this.setState({
            modalType: 'failAddBuilding',
        })

        let sendData = {
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    reloadDataTable =() => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }


    getDataFromServer = (query) => {
        return new Promise((resolve, reject) => {
            Building.getBuilding(0, this.BuildInput, this.AddrInput, query.page +1)
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

    render() {
        return(
            <Fragment>
                <Modal 
                    type={this.state.modalType}
                    ref={this.modalRef}
                />
                <div style={styles.searchContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={this.state.headerStyle}>Quản lý tòa nhà trong hệ thống
                    </h2>
                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                            Danh sách các tòa nhà trong hệ thống
                        </span>
                    </div>
                    <div  className="div-control" style={{width: '50%'}}>
                        <div style={styles.searchInput}>
                                <Input
                                    title={'Tòa nhà'}
                                    onChange = {this.onChangeBInput}
                                    />
                        </div>
                        <div style={styles.searchInput}>
                                <Input 
                                    title ={'Địa chỉ'}
                                    onChange = {this.onChangeAddrInput}
                                    />
                        </div>
                        <div style={styles.searchInput}>
                                <Button
                                    title ={'Tìm kiếm'}
                                    onClick = {this.onSearchClick}
                                />
                        </div>
                    </div>
                    <MaterialTable
                    tableRef = {this.tableRef}
                    columns = {this.columnsTable}
                    options={this.optionsTable}
                    icons = {TableIcons}
                    data = {this.getDataFromServer}
                    title = {'Danh sách các tòa nhà trong hệ thống'}
                    editable={{
                        onRowUpdate: this.onEditTableRow,
                        onRowDelete: this.onDeleteTableRow,
                    }}
                    localization={this.localizations}
                    />
                </div>
                <FButton 
                    title={'Thêm tòa nhà'}
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