import React, { Fragment } from 'react';
import User from '../../../core/user'
import MaterialTable from 'material-table'
import TableIcons from '../../common/materialicon'
import Input from '../../common/input'
import Button from '../../common/button'
import Combobox from '../../common/combobox'
import Department from '../../../core/department'
import ResponseCode from '../../../staticresources/responsecode'
import Modal from '../../common/modal'
import {blue} from '@material-ui/core/colors'
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'


export default class UserManagement extends React.Component {
    NameInput = '';
    IdNSInput = '';
    EmailInput = '';
    RcodeInput = '';
    dictDev = {};
    isGroup = 0;
    isPIN = 0;
    isTag = 0;
    Dep = [];
    dictDid = {};
    dIdInput = 0;

    constructor(props) {
        super(props);
        this.state = {
            isUpdateView: false,
            headerColor: 'black',
            modalType: '',
        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();
    }


    columns = [
        {
            title: 'Họ và tên',
            field: 'name'
        },
        {
            title: 'ID nhân sự',
            field: 'eCode',
            editable: 'never',
        },
        {
            title: 'Email',
            field: 'email',
            //editable: 'never',
        },
        {
            title: 'Bộ phận làm việc',
            field: 'dId',
            lookup: this.dictDev,
        },
        {
            title: 'Tình trạng PINCode',
            field: 'pCode',
            editable: 'never',
            render: rowData => {
                if (rowData.pCode === 0) {
                    return (
                        <span style={{ color: 'red' }}>
                            Chưa có
                        </span>
                    )
                }
                else {
                    return (
                        <span style={{ color: 'green' }}>
                            Đã có
                        </span>
                    )
                }
            }
        },
        {
            title: 'Thẻ từ đang sử dụng',
            field: 'rCode',
            editable: 'never',
        },
        {
            title: 'Tình trạng phân tủ',
            field: 'gStatus',
            editable: 'never',
            render: rowData => {
                if (rowData.gStatus === 0) {
                    return (
                        <span style={{ color: 'red' }}>
                            Chưa được phân tủ
                        </span>
                    )
                }
                else {
                    return (
                        <span style={{ color: 'green' }}>
                            Đã được phân tủ
                        </span>
                    )
                }
            }
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
                deleteText: 'Bạn có chắc chắn muốn xoá nhân viên này khỏi hệ thống?',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý'
            }
        }
    }

    options1 = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
        showTitle: false,
        actionsColumnIndex: -1,
        rowStyle: rowData =>({
            backgroundColor: (rowData.tableData.id %2)?'rgb(247, 247, 247)': '#FFF',
            color: 'inherit',
            width: 'calc((100% - 0px) / 7)',
            boxSizing: 'border-box',
            borderRight: '0.1vh solid rgb(204, 204, 204)',
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

    onModalCallme = (data) => {
        console.log(data);
    }

    onNameChange = (value) => {
        this.NameInput = value;
    }

    onIdNSChange = (value) => {
        this.IdNSInput = value;
    }

    onEmailChange = (value) => {
        this.EmailInput = value;
    }

    onRcodeChange = (value) => {
        this.RcodeInput = value;
    }

    onChangeIsPIN = (value) => {
        if (value === 'Đã có PINCode') {
            this.isPIN = 2;
        }
        else {
            this.isPIN = 1;
        }
    }

    onChangeIsGroup = (value) => {
        if (value === 'Chưa được phân tủ') {
            this.isGroup = 1;
        }
        else {
            this.isGroup = 2;
        }
    }

    onChangeIsTag = (value) => {
        if (value === 'Chưa có thẻ') {
            this.isTag = 1;
        }
        else {
            this.isTag = 2;
        }
    }

    onChangDep = (value) => {
        this.dIdInput = this.dictDid[value];
    }

    onSearchClick = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
        // if (typeof this.tableRef.current !== 'undefined'){
        //     this.tableRef.current.onQueryChange();
        // }
    }

    onClickAdd = () => {
        this.setState({
            modalType: 'addEmployee',
        })

        let sendData = {
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFail
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddEmployee',
        })

        let sendData={
            callback: this.reloadDataTable,
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);

    }

    onModalCallFail =() => {
        this.setState({
            modalType: 'failAddEmployee',
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
            User.getUser(this.dIdInput, this.NameInput, this.IdNSInput, this.EmailInput, this.RcodeInput, this.isTag, this.isPIN, this.isGroup, query.page + 1)
                .then(value => {
                    resolve({
                        data: value.items,
                        page: value.currentPage - 1,
                        totalCount: value.total,
                    })
                })
        })
    }

    editUser = (rowData) => {
        console.log(rowData);
    }


    componentDidMount() {
        Department.getDepartment()
            .then(value => {
                if (value) {
                    if (value.items.length > 0) {
                        value.items.map((item, index) => {
                            {
                                this.dictDev[item.dId] = item.dName;
                                this.Dep[index] = item.dName;
                                this.dictDid[item.dName] = item.dId;
                            }
                        })
                    }
                    this.setState({
                        isUpdateView: !this.isUpdateView,
                    });
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

    onEditTableRow = (newData, oldData) => {
        return new Promise((resolve, reject) => {
            User.editUser(oldData.eId, newData.name, newData.email, newData.dId, oldData.tag)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_emp_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });
    }

    onDeleteTableRow = (oldData) => {
        return new Promise((resolve, reject) => {
            User.removeUser(oldData.eId)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.remove_emp_success) {
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

        return (
            <Fragment>
                <Modal
                type={this.state.modalType}
                ref={this.modalRef} 
                />
                <div style={styles.mainContainer}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={headerStyle}> Quản lý người dùng
                    </h2>
                </div>
                <div className="around">
                    <div className="title-style">
                        <span>
                            Danh sách người dùng hiện tại
                        </span>
                    </div>
                    <div style={styles.searchContainer}>
                        <div style={styles.searchInput}>
                            <Input
                                title={'Tên nhân viên'}
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Input
                                title={'ID nhân sự'}
                                onChange={this.onIdNSChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Bộ phận làm việc'}
                                data={this.Dep}
                                onChange={this.onChangDep}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Input
                                title={'Email'}
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Input
                                title={'Mã thẻ từ'}
                                onChange={this.onRcodeChange
                                }
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Tình trạng sử dụng thẻ'}
                                data={[
                                    'Chưa có thẻ',
                                    'Đã có thẻ',
                                ]}
                                onChange={this.onChangeIsTag}
                            />
                        </div>
                    </div>
                    <div className="div-control" style={{ display: 'flex' }}>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Tình trạng phân tủ'}
                                onChange={this.onChangeIsGroup}
                                data={[
                                    'Chưa được phân tủ',
                                    'Đã được phân tủ',
                                ]}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox
                                title={'Tình trạng PINCode'}
                                data={[
                                    'Đã có PINCode',
                                    'Chưa có PINCode',
                                ]}
                                onChange={this.onChangeIsPIN}
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Button title={'Tìm kiếm'}
                                onClick={this.onSearchClick} />
                        </div>
                        <div style={{ flex: 3, paddingRight: 30, }}>

                        </div>
                    </div>

                    <div style={{ maxWidth: '100%' }}>
                        <MaterialTable
                            tableRef={this.tableRef}
                            options={this.options1}
                            icons={TableIcons}
                            columns={this.columns}
                            data={this.getDataFromServer}
                            //actions={this.actions}
                            editable={{
                                onRowUpdate: this.onEditTableRow,
                                onRowDelete: this.onDeleteTableRow,
                            }}
                            localization={this.localizations}
                        />
                    </div>
                </div>
                <FButton title={'Thêm mới nhân viên'}
                    icon={<Add/>}
                    position={['auto', 20, 'auto', 100]} 
                    onClick={this.onClickAdd}/>
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