import React, { Fragment } from 'react'
import Home from './home'
import UserManagement from './usermanagement/usermanagement'
import TagManagement from './tagmanagement/tagmanagement'
import LockerStatusReport from './reportmanagement/lockerstatusrepost'
import LockerHistoryReport from './reportmanagement/lockerhistoryreport'
import LockerRealTimeReport from './reportmanagement/lockerrealtimereport'
import MapUserLockerManagement from './usingmanagement/mapuserlockermanagement'
import ManageUserLockerManagement from './usingmanagement/mangeuserlockermanagement'
import LockerManagement from './lockermanagement/lockermanagement'
import LockerLayoutManagement from './lockermanagement/lockerlayoutmanagement'
import WarningManagement from './warningmanagement/warningmanagement'
import BuildingManagement from './buildingmanagement/buildingmanagement'
import LevelManagement from './levelmanagement/levelmanagement'
import ControllerManagement from './controllermanagement/controllermanagement'
import DepartmentManagement from './departmentmanagement/departmentmanagement'

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: this.props.tag,
        }
    }

    componentDidMount() {

    }

    onNavigate = () => {
        switch (this.props.tag) {
            case 'home':
                return <Home />
            case 'userManage':
                return <UserManagement />
            case 'userTagManage':
                return <TagManagement />
            case 'reportStatus':
                return <LockerStatusReport />
            case 'reportHistory':
                return <LockerHistoryReport />
            case 'reportRealtime':
                return <LockerRealTimeReport />
            case 'mapLockerManage':
                return <MapUserLockerManagement />
            case 'userLockerManage':
                return <ManageUserLockerManagement />
            case 'lockerManage':
                return <LockerManagement />
            case 'layoutManage':
                return <LockerLayoutManagement />
            case 'warning':
                return <WarningManagement />
            case 'buildingManage':
                return <BuildingManagement />
            case 'levelManage':
                return <LevelManagement/>
            case 'ctlManage':
                return <ControllerManagement/>
            case 'depManage':
                return <DepartmentManagement/>
            default:
                return;
        };
    }


    render() {
        return (
            <Fragment>
                {this.onNavigate()}
            </Fragment>
        );
    }
}