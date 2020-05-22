import React, { Fragment } from 'react'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import UnLock from '@material-ui/icons/LockOpen'
import Done from '@material-ui/icons/DoneAll'
import Refresh from '@material-ui/icons/Refresh'
import Bug from '@material-ui/icons/BugReport'
import Build from '@material-ui/icons/Build'
import Disable from '@material-ui/icons/NoMeetingRoom'
import Delete from '@material-ui/icons/Delete'


export default class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    onEditLockerClick = (data) => {

    }

    onOpenLockerClick = (data) => {

    }

    onFreeLockerClick = (data) => {

    }

    onConfirmLockerClick = (data) => {

    }

    onDisableLockerClick = (data) => {

    }

    onEnableLockerClick = (data) => {

    }

    onReportLockerClick = (data) => {

    }

    renderLockerFree = (data) => {
        return (
            <Fragment>
                <ContextMenuTrigger id={'menu-' + data.lId}>
                    <div style={styles.itemFree} className={'lockerHover'}>
                        <div>
                            {data.lLb}
                        </div>
                        {'Tủ trống'}
                        {
                            (typeof (data.gId) !== 'undefined') ?
                                <div>
                                    {'Tủ chưa được phân'}
                                    {
                                        (data.health === 'ERROR') ?
                                            <div>
                                                {'Tủ có lỗi kỹ thuật'}
                                            </div>
                                            : null
                                    }
                                </div>
                                : null
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={'menu-' + data.lId}>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('openLocker', data.lId) }}>
                        <UnLock color='secondary' />
                        <div style={{ marginLeft: 10 }}>Mở tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('freeLocker', data.lId) }}>
                        <Refresh color='secondary' />
                        <div style={{ marginLeft: 10 }}>Giải phóng tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('confirmLocker', data.lId) }}>
                        <Build color='secondary' />
                        <div style={{ marginLeft: 10 }}>Xác nhận mở tại chỗ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('disableLocker', data.lId) }}>
                        <Disable color='secondary' />
                        <div style={{ marginLeft: 10 }}>Vô hiệu hoá tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('enableLocker', data.lId) }}>
                        <Done color='secondary' />
                        <div style={{ marginLeft: 10 }}>Tái kích hoạt tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('reportLocker', data.lId) }}>
                        <Bug color='secondary' />
                        <div style={{ marginLeft: 10 }}>Báo lỗi tủ</div>
                    </MenuItem>
                </ContextMenu>
            </Fragment>
        )
    }

    renderLockerOccupied = (data) => {
        return (
            <Fragment>
                <ContextMenuTrigger id={'menu-' + data.lId}>
                    <div style={styles.itemOccuppied} className={'lockerHover'}>
                        <div>
                            {data.lLb}
                        </div>
                        <div>
                            {data.eName}
                        </div>
                        <div>
                            {data.eCode}
                        </div>
                        {
                            data.health === 'ERROR' ?
                                <div>
                                    {'Tủ có lỗi kỹ thuật'}
                                </div>
                                : null
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={'menu-' + data.lId}>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('openLocker', data.lId) }}>
                        <UnLock color='secondary' />
                        <div style={{ marginLeft: 10 }}>Mở tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('freeLocker', data.lId) }}>
                        <Refresh color='secondary' />
                        <div style={{ marginLeft: 10 }}>Giải phóng tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('confirmLocker', data.lId) }}>
                        <Build color='secondary' />
                        <div style={{ marginLeft: 10 }}>Xác nhận mở tại chỗ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('disableLocker', data.lId) }}>
                        <Disable color='secondary' />
                        <div style={{ marginLeft: 10 }}>Vô hiệu hoá tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('enableLocker', data.lId) }}>
                        <Done color='secondary' />
                        <div style={{ marginLeft: 10 }}>Tái kích hoạt tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('reportLocker', data.lId) }}>
                        <Bug color='secondary' />
                        <div style={{ marginLeft: 10 }}>Báo lỗi tủ</div>
                    </MenuItem>
                </ContextMenu>
            </Fragment>
        )
    }

    renderLockerDisabled = (data) => {
        return (
            <Fragment>
                <ContextMenuTrigger id={'menu-' + data.lId}>
                    <div style={styles.itemDisabled} className={'lockerHover'}>
                        <div>
                            {data.lLb}
                        </div>
                        {'Tủ bị vô hiệu hoá'}
                        {
                            (typeof (data.gId) !== 'undefined') ?
                                <div>
                                    {'Tủ chưa được phân'}
                                </div>
                                : null
                        }
                        {
                            data.health === 'ERROR' ?
                                <div>
                                    {'Tủ có lỗi kỹ thuật'}
                                </div>
                                : null
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={'menu-' + data.lId}>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('openLocker', data.lId) }}>
                        <UnLock color='secondary' />
                        <div style={{ marginLeft: 10 }}>Mở tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('freeLocker', data.lId) }}>
                        <Refresh color='secondary' />
                        <div style={{ marginLeft: 10 }}>Giải phóng tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('confirmLocker', data.lId) }}>
                        <Build color='secondary' />
                        <div style={{ marginLeft: 10 }}>Xác nhận mở tại chỗ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('disableLocker', data.lId) }}>
                        <Disable color='secondary' />
                        <div style={{ marginLeft: 10 }}>Vô hiệu hoá tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('enableLocker', data.lId) }}>
                        <Done color='secondary' />
                        <div style={{ marginLeft: 10 }}>Tái kích hoạt tủ</div>
                    </MenuItem>
                    <MenuItem onClick={() => { this.props.onContextMenuClick('reportLocker', data.lId) }}>
                        <Bug color='secondary' />
                        <div style={{ marginLeft: 10 }}>Báo lỗi tủ</div>
                    </MenuItem>
                </ContextMenu>
            </Fragment>
        )
    }

    renderLayoutContent = () => {
        const { data } = this.props;
        let listDiv = [];
        if (data) {
            if (data.listLk.length > 0) {
                for (let i = 0; i <= 2; i++) {
                    for (let j = 0; j <= 6; j++) {
                        let lIndex = data.listLk.findIndex((element, index, array) => {
                            return (element.lCl === j && element.lRw === i);
                        })

                        if (lIndex > -1) {
                            listDiv.push(
                                <Fragment key={data.listLk[lIndex].lId}>
                                    <ContextMenuTrigger id={'menu-' + data.listLk[lIndex].lId}>
                                        <div onClick={() => {
                                            this.props.onLockerClick({
                                                'col': j,
                                                'row': i,
                                                'page': data.page,
                                                'lId': data.listLk[lIndex].lId,
                                                'level': data.level,
                                                'number': data.listLk[lIndex].lNum,
                                                'imei': data.imei,
                                                'label': data.listLk[lIndex].lLb,
                                            })
                                        }}>
                                            <div style={styles.itemOccuppied} className={'lockerHover'}>
                                                <div>
                                                    {data.listLk[lIndex].lLb}
                                                </div>
                                                <div>
                                                    {'Số thứ tự: ' + data.listLk[lIndex].lNum}
                                                </div>
                                            </div>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenu id={'menu-' + data.listLk[lIndex].lId}>
                                        <MenuItem onClick={() => { this.props.onContextMenuClick('removeLocker', data.listLk[lIndex].lId) }}>
                                            <Delete color='secondary' />
                                            <div style={{ marginLeft: 10 }}>Xoá tủ</div>
                                        </MenuItem>
                                    </ContextMenu>
                                </Fragment>

                            )
                        }
                        else {
                            listDiv.push(
                                <div key={'layout-' + i + '-' + j + '-' + data.page} onClick={() => {
                                    this.props.onLockerClick({
                                        'col': j,
                                        'row': i,
                                        'page': data.page,
                                        'lId': 0,
                                        'number': '',
                                        'level': data.level,
                                        'imei': data.imei,
                                        'label': '',
                                    })
                                }}>
                                    <div style={styles.itemOccuppied} className={'lockerHover'}>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            }
        }
        return (
            <div style={styles.mainContainer}>
                {
                    listDiv.map((Div, index) => {
                        return Div;
                    })
                }
            </div>
        )
    }

    renderManageContent = () => {
        const { data } = this.props;
        let listDiv = [];
        if (data) {
            if (data.listLk.length > 0) {
                for (let i = 0; i <= 2; i++) {
                    for (let j = 0; j <= 6; j++) {
                        let lIndex = data.listLk.findIndex((element, index, array) => {
                            return (element.lCl === j && element.lRw === i);
                        })

                        if (lIndex > -1) {
                            listDiv.push(
                                <div key={data.listLk[lIndex].lId}>
                                    {
                                        data.listLk[lIndex].aStatus === 'FREE' ?
                                            this.renderLockerFree(data.listLk[lIndex])
                                            :
                                            <div>
                                                {
                                                    data.listLk[lIndex].aStatus === 'OCCUPIED' ?
                                                        this.renderLockerOccupied(data.listLk[lIndex])
                                                        :
                                                        <div>
                                                            {
                                                                data.listLk[lIndex].aStatus === 'DISABLED' ?
                                                                    this.renderLockerDisabled(data.listLk[lIndex])
                                                                    : null
                                                            }
                                                        </div>
                                                }
                                            </div>
                                    }
                                </div>
                            )
                        }
                        else {
                            listDiv.push(
                                <div key={'empty' + i + '-' + j + '-' + data.page}>

                                </div>
                            )
                        }
                    }
                }
            }
        }
        return (
            <div style={styles.mainContainer}>
                {
                    listDiv.map((Div, index) => {
                        return Div;
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.type === 'manage' ?
                        this.renderManageContent()
                        :
                        this.renderLayoutContent()
                }
            </Fragment>
        )
    }
}

const styles = {
    mainContainer: {
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        display: 'grid',
        marginTop: 30,
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