import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Button from '../../common/button';
import Department from '../../../core/department';
import ResponseCode from '../../../staticresources/responsecode'
import Modal from '../../common/modal'
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'

export default class DepartmentManagement extends React.Component {

    DepInput = '';

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
            modalType: '',
        };
        this.modalRef = React.createRef();
        this.tableRef = React.createRef();
    }

    columnsTable = [
        {
            title: 'Tên', 
            field: 'dName',
        },
    
    ]

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            lastTooltip: 'Trang cuối',
            firstTooltip: 'Trang đầu'
        },
        body: {
            editRow: {
                deleteText: 'Bạn có chắc chắn muốn xoá bộ phận/phòng ban này khỏi hệ thống?',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý'
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
            border: '1px solid rgba(224, 224, 224, 1)'  
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
            icon: () => <TableIcons.Edit color="primary"/>,
            tooltip: 'Chỉnh sửa thông tin',
            onClick: (event, rowData) => alert("You want Edit " + rowData.name)
        },
        rowData => ({
            icon: () => <TableIcons.Delete color="primary"/>,
            tooltip: 'Xóa',
            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
        })
    ]

    onChangeDep = (value) => {
        this.DepInput = value;
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

    onClickAdd =() => {
        this.setState({
            modalType: 'addDepartment'
        })

        let sendData = {
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFail
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddDepartment',
        })

        let sendData={
            callback: this.reloadDataTable,
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);

    }

    onModalCallFail =() => {
        this.setState({
            modalType: 'failAddDepartment',
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
            Department.getDepartment(0, this.DepInput, query.page +1)
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

    onEditTableRow = (newData, oldData) => {
        // console.log(newData);
        // console.log(oldData);
        return new Promise((resolve, reject) => {
            Department.editDepartment(oldData.dId, newData.dName)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_dep_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });
    }

    onDeleteTableRow = (oldData) => {
        return new Promise((resolve, reject) => {
            Department.removeDepartment(oldData.dId)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.remove_dep_success) {
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
                ref={this.modalRef} 
                />
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Quản lý bộ phận / phòng ban
                    </h2>

                </div>
                <div className ="around">
                    <div className= "title-style">
                            <span> 
                            Quản lý bộ phận / phòng ban
                            </span>
                    </div>
                    <div  style= {styles.SearchContainer}> 
                        <div style={styles.searchInput}>
                            <Input 
                                title={' Bộ phận/ Phòng ban'}
                                onChange = {this.onChangeDep} />
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
                    options = {this.optionsTable}
                    icons = {TableIcons}
                    data = {this.getDataFromServer}
                    title ={'Danh sách bộ phận/ Phòng ban '}
                    // actions={this.actions}
                    editable={{
                        onRowUpdate: this.onEditTableRow,
                        onRowDelete: this.onDeleteTableRow
                    }}
                    localization={this.localizations}
                    />
                </div>
                <FButton
                title={'Thêm bộ phận/ phòng ban'}
                icon ={<Add/>}
                onClick={this.onClickAdd}
                position = {['auto', 20, 'auto', 80]}
                />
            </Fragment>

        )
    }
}

const styles = {
    mainContainer: {
        margin: '30px 10px 40px 20px',

    },

    SearchContainer: {
        display: 'flex',
        marginBottom: '30px',
        width: '40%'
    },

    searchInput: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    }
}