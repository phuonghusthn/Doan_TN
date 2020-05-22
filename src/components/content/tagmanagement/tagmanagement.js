import React, { Fragment } from 'react';
import User from '../../../core/user';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Input from '../../common/input';
import Button from '../../common/button';
import Combobox from '../../common/combobox'
import Department from '../../../core/department'
import Modal  from '../../common/modal'
import {blue} from '@material-ui/core/colors'
 

export default class TagManagement extends React.Component {
    isPIN = 0;
    isTag = 0;
    NameInput = '';
    IdNSInput = '';
    EmailInput = '';
    RcodeInput = '';
    dictDev = {};
    dictDid = {};
    dIdInput = 0;
    Dep = [];

    constructor(props) {
        super(props);
        this.state = {
            modalType: '',
            headerColor: 'black',
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
            field: 'eCode' 
        },
        {
            title: 'Bộ phận làm việc', 
            field: 'dId', 
            render: rowData =>{
                if(rowData.dId % 2 === 0 )
                {
                    return (
                        <span style={{color: 'red'}}> 
                            {this.dictDev[rowData.dId]}
                        </span>)
                }
                else {
                    return (
                        <span style={{color: 'blue'}}> 
                            {this.dictDev[rowData.dId]}
                        </span>)
                }
            }
        },
        {
            title: 'Email cá nhân', 
            field: 'email'
        },
        { 
            title: 'Tình trạng PINCode',
             field: 'pCode',
             render: rowData => 
             {
                 if(rowData.pCode === 0) {
                     return(
                         <span syle={{color: 'red'}}>
                             Chưa có
                         </span>
                     )
                 }
                 else {
                     return(
                         <span syle={{color: 'green'}}>
                             Đã có
                         </span>
                     )
                 }
             } 
        },
        { 
            title: 'Thẻ từ đang sử dụng', 
            field: 'rCode' 
        },
        
    ] 

    localizations = {
        pagination: {
            nextTooltip: 'Trang kế',
            previousTooltip: 'Trang trước',
            firstTooltip: 'Trang đầu',
            lastTooltip: 'Trang cuối',
        },
    }

    optionsTable = {
        pageSize: 20,
        pageSizeOptions: [20],
        search: false,
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

    actions = [
        {
          icon: () => <TableIcons.Edit style={{color: blue[500]}}/>,
          tooltip: 'Chỉnh sửa thông tin thẻ từ',
          onClick: (event, rowData) => {
                this.setState({
                    modalType: 'editTagEmployee',
                });
                let sendData = {
                    empData: rowData,
                    callback: this.onModalCallme
                }
                console.log(this.state.modalType);
                this.modalRef.current && this.modalRef.current.onModalShow(sendData);
            },
        },
        rowData => ({
            icon: () => <TableIcons.Email style={{color: blue[500]}}/>,
            tooltip: 'Gửi PINCode',
            onClick: (event, rowData) => {
                this.setState({

                    modalType: 'sendPin',
                });

                let sendData = {
                    empData: rowData,
                    callback: this.onModelSendPinCall,
                    callbackFail: this.onFailSendPinCall
                }
                this.modalRef.current && this.modalRef.current.onModalShow(sendData);
            }
        }),
        rowData => ({
            icon: () => <TableIcons.BlurOn style={{color: blue[500]}}/>,
            tooltip: 'Tạo mới PINCode',
            onClick: (event, rowData) => {
                this.setState({
                    modalType: 'mapPinCode',
                });

                let sendData = {
                    empData: rowData,
                    callback: this.onModelMapPinCall,
                    //callbackFail: this.onFailSendPinCall
                }
                this.modalRef.current && this.modalRef.current.onModalShow(sendData);
            }
            
        }),
        rowData => ({
          icon: () => <TableIcons.BlurOff style={{color: blue[500]}}/>,
          tooltip: 'Xóa PINCode',
          onClick: (event, rowData) => {
                this.setState({
                  modalType: 'unmapPinCode',
                });

                let sendData = {
                    empData: rowData,
                    callback: this.onModalUnmapPinCall
                }
                this.modalRef.current && this.modalRef.current.onModalShow(sendData);
          },
        }),
        rowData => ({
            icon: () => <TableIcons.LabelOff style={{color: blue[500]}}/>,
            tooltip: 'Xóa quyền sử dụng thẻ từ',
            onClick: (event, rowData) =>{
                this.setState({
                    modalType: 'unmaptag',
                })

                let sendData = {
                    empData: rowData,
                    callback: this.onModalUnmapTagCall
                }
                this.modalRef.current && this.modalRef.current.onModalShow(sendData);
            },
          })
    ]

    onModalCallme = () => {
        this.setState({
            modalType: 'successEditTagEmployee',
        });
        let sendData = {
            callback: this.onModalCallSuccess
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModelSendPinCall = () => {
        this.setState({
            modalType: 'successSendPin',
        });
        let sendData = {
            callback: this.onModalCallSuccess
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onFailSendPinCall =() => {
        this.setState({
            modalType: 'failSendPin',
        });
        
        this.modalRef.current && this.modalRef.current.onModalShow();

    }

    onModalCallSuccess = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }

    onModelMapPinCall = () => {
        this.setState({
            modalType: 'successMapPin',
        });
        let sendData = {
            callback: this.onModalCallSuccess
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalUnmapPinCall = () => {
        this.setState({
            modalType: 'successUnmapPin',
        })
        let sendData = {
            callback: this.onModalCallSuccess
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalUnmapTagCall =() => {
        this.setState({
            modalType: 'successUnmapTag',
        })
        let sendData = {
            callback: this.onModalCallSuccess
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onChangeIsPIN = (value) => {
        if (value === 'Đã có PINCode') {
            this.isPIN = 2;
        }
        else {
            this.isPIN = 1;
        }
    }

    onChangeIsTag = (value) => {
        if (value === 'Chưa có thẻ') {
            this.isTag= 1;
        }
        else {
            this.isTag = 2;
        }
    } 

    onChangeDep = (value) => {
        this.dIdInput = this.dictDid[value];
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
   
    onSearchClick = () => {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }   


    getDataFromUser = (query) => {
        return new Promise((resolve, reject) => {
            User.getUser(this.dIdInput, this.NameInput, this.IdNSInput, this.EmailInput, this.RcodeInput, this.isTag, this.isPIN, 0, query.page + 1)
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
        // console.log('componentDidMount')
        // console.log(this.state.modalType);
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

    render() {

        return(
            <Fragment>
                <Modal type={this.state.modalType}
                    ref={this.modalRef}/>
                <div style ={{margin: '30px 10px 40px 20px'}}>
                    <h2 onMouseOver={this.onMouseOverHeader}
                        onMouseLeave={this.onMouseLeaveHeader}
                        style={this.state.headerStyle}> Quản lý sử dụng PINCode và thẻ từ
                    </h2>
                </div>
                <div className ="around">
                    <div className= "title-style">
                        <span> 
                            Danh sách người dùng hiện tại 
                        </span>
                    </div>
                    
                    <div style={{display: 'flex' }}>
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
                            data = {this.Dep}
                            onChange = {this.onChangeDep}
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
                                onChange = {this.onRcodeChange
                            }
                            />
                        </div>
                        <div style={styles.searchInput}>
                            <Combobox 
                                title={'Tình trạng sử dụng thẻ'}
                                data= {[
                                    'Chưa có thẻ',
                                    'Đã có thẻ',
                                ]}
                                onChange = {this.onChangeIsTag}
                            /> 
                        </div>                        
                    </div>
                    <div className="div-control" style={{width: '33%'}}>
                        <div style={styles.searchInput}>
                            <Combobox 
                                title={'Tình trạng PINCode'}
                                data = { [
                                        'Đã có PINCode',
                                        'Chưa có PINCode',
                                    ] }
                                onChange = {this.onChangeIsPIN}
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
                        <MaterialTable
                            tableRef = {this.tableRef}
                            icons = {TableIcons}
                            columns= {this.columns}
                            options = {this.optionsTable}
                            data = {this.getDataFromUser}
                            actions={this.actions}
                            localization={this.localizations}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const styles = {
    searchInput: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    }
}