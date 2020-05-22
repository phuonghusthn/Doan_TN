import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import TableIcons from '../../common/materialicon';
import Button from '../../common/button';
import Building from '../../../core/building';
import Level  from '../../../core/level';
import Combobox from '../../common/combobox';
import ResponseCode from '../../../staticresources/responsecode'
import FButton from '../../common/floatbutton'
import Add from '@material-ui/icons/Add'
import Modal from '../../common/modal'

export default class LevelManagement extends React.Component {

    DictBName = {};
    Build = [];
    DictBId = {};
    BIdInput = 0;

    constructor(props) {
        super(props);
        this.state = {
            headerColor: 'black',
        };
        this.tableRef = React.createRef();
        this.modalRef = React.createRef();
    }

    columnsTable = [
        {
            title: 'Tòa nhà',
            field: 'bName',
            editable: 'never',
        },
        {
            title: 'Tầng',
            field: 'lLv', 
            editable: 'never',
            render: rowDate => {
                return(
                    <span>
                        Tầng {rowDate.lLv}
                    </span>
                )
            }
        },
        {
            title: 'Thông tin chi tiết',
            field: 'lDes'
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
                deleteText: 'Bạn có chắc chắn muốn xoá tầng này khỏi hệ thống? Mọi thông tin liên quan đến tầng này bao gồm thông tin về các thiết bị điều khiển và tủ cũng sẽ được xoá nếu bạn chọn Đồng Ý!',
                cancelTooltip: 'Hủy bỏ',
                saveTooltip: 'Đồng ý'
            }
        }
    }

    optionsTable = {
        search: false,
        pageSize: 20,
        pageSizeOptions: [20],
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

    onClickAdd =() => {
        this.setState({
            modalType: 'addLevel'
        })

        let sendData = {
            callback: this.onModalSuccess,
            callbackfail: this.onModalCallFail
        }
        this.modalRef.current && this.modalRef.current.onModalShow(sendData);
    }

    onModalSuccess = () =>{
        this.setState({
            modalType: 'successAddLevel',
        })

        let sendData={
            callback: this.reloadDataTable,
            callbackContinue: this.onClickAdd
        }

        this.modalRef.current && this.modalRef.current.onModalShow(sendData);

    }

    onModalCallFail =() => {
        this.setState({
            modalType: 'failAddLevel',
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
            Level.getLevel(this.BIdInput, query.page +1)
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

    onChangeBuildInput = (value) => {
        this.BIdInput = this.DictBId[value];
    }
    onClickSearch = () => {
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
        console.log(oldData);
        console.log(newData);
        return new Promise((resolve, reject) => {
            Level.editLevel(oldData.lId, oldData.bId, newData.lDes, oldData.lLv)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_lvl_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });

    }

    onDeleteTableRow = (oldData) => {
       // console.log(oldData);
        return new Promise((resolve, reject) => {
            Level.removeLevel(oldData.lId)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.remove_lvl_success) {
                            resolve();
                        }
                    }
                    resolve();
                })
        });
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
    }

    render () {

        let headerStyle = {
            color: this.state.headerColor,
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
                        style={headerStyle}>Quản lý các tầng trực thuộc các toà nhà trong hệ thống
                    </h2>
                </div>

                <div className ="around">
                    <div className= "title-style">
                        <span> 
                        Quản lý các tầng trực thuộc các toà nhà trong hệ thống
                        </span>
                    </div>

                    <div style={styles.mainSearch}>
                        <div style={styles.searchInput}>
                            <Combobox 
                            title={'Tòa'}
                            data = {this.Build}
                            onChange={this.onChangeBuildInput}

                        />
                        </div>
                        <div style={styles.searchInput}>
                            <Button 
                            title ={'Tìm kiếm'}
                            onClick = {this.onClickSearch}
                            />
                        </div>
                        
                    </div>
                    <MaterialTable
                    tableRef = {this.tableRef}
                    columns = {this.columnsTable}
                    options={this.optionsTable}
                    icons = {TableIcons}
                    data = {this.getDataFromServer}
                    title = {'Danh sách các tầng nhà trong hệ thống'}
                    editable={{
                        onRowUpdate: this.onEditTableRow,
                        onRowDelete: this.onDeleteTableRow,
                    }}
                    localization={this.localizations}
                    />
                </div>
                <FButton 
                    title={'Thêm tầng'}
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
    },

    mainSearch : {
        width: '50%', 
        display: 'flex', 
        paddingBottom: '30px'
    }
}