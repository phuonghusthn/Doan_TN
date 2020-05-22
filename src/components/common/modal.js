import React from 'react'
import Logo from '../../imgs/logo.png'
import EditEmployee from '../content/usermanagement/editemployee'
import EditTagEmployee from '../content/tagmanagement/edittagemployee'
import SuccessEditTagEmployee from '../content/tagmanagement/successEditTagEmployee'
import SendPinConfirm from '../content/tagmanagement/sendpinconfirm'
import SuccessSenPin from '../content/tagmanagement/successsendpin'
import FailSendPin from '../content/tagmanagement/failsendpin'
import MapPinCode from '../content/tagmanagement/mappincode'
import SuccessMapPin from '../content/tagmanagement/successmappin'
import UnMapPinCode from '../content/tagmanagement/unmappincode'
import SuccessUnmapPin from '../content/tagmanagement/successunmappin'
import UnMapTag from '../content/tagmanagement/unmaptag'
import SuccessUnmapTag from '../content/tagmanagement/successunmaptag'
import EditController from '../content/controllermanagement/editcontroller'
import SuccessEditController from '../content/controllermanagement/successeditcontroller'
import FailEditController from '../content/controllermanagement/faileditcontroller'
import AddLoker from '../content/usingmanagement/addloker'
import AddEmployee from '../content/usermanagement/addemployee'
import SuccessAddEmployee from '../content/usermanagement/successaddemployee'
import FailAddEmployee from '../content/usermanagement/failaddemployee'
import AddDepartment from '../content/departmentmanagement/adddepartment'
import SuccessAddDepartment from '../content/departmentmanagement/successadddepartment'
import FailAddDepartment from '../content/departmentmanagement/failadddepartment'
import AddBuilding from '../content/buildingmanagement/addbuilding'
import SuccessAddBuilding from '../content/buildingmanagement/successaddbuilding'
import FailAddBuilding from '../content/buildingmanagement/failaddbuilding'
import AddLevel from '../content/levelmanagement/addlevel'
import SuccessAddLevel from '../content/levelmanagement/successaddlevel'
import FailAddLevel from '../content/levelmanagement/failaddlevel'
import AddController from '../content/controllermanagement/addcontroller'
import SuccessAddController from '../content/controllermanagement/successaddcontroller'
import FailAddController from '../content/controllermanagement/failaddcontroller'
import MapNewLocker from '../content/usingmanagement/mapnewlocker'
import SuccessMapNewLocker from '../content/usingmanagement/successmapnewlocker'
import FailMapNewLocker from '../content/usingmanagement/failmapnewlocker'
import LockerOpen from '../content/lockermanagement/lockeropen'
import SuccessLockerOpen from '../content/lockermanagement/successlockeropen'
import LockerFree from '../content/lockermanagement/lockerfree'
import SuccessLockerFree from '../content/lockermanagement/successlockerfree'
import FailLockerFree from '../content/lockermanagement/faillockerfree'
import ConfirmLocker from '../content/lockermanagement/cofirmlocker'
import SuccessConfirmLocker from '../content/lockermanagement/successconfirmlocker'
import FailConfirmLocker from '../content/lockermanagement/failconfirmlocker'
import DisableLocker from '../content/lockermanagement/disablelocker'
import SuccessDisableLocker from '../content/lockermanagement/successdisablelocker'
import FailDisableLocker from '../content/lockermanagement/faildisablelocker'
import EnableLocker from '../content/lockermanagement/enablelocker'
import SuccessEnableLocker from '../content/lockermanagement/successenablelocker'
import FailEnableLocker from '../content/lockermanagement/failenablelocker'
import ReportLocker from '../content/lockermanagement/reportlocker'
import SuccessReportLocker from '../content/lockermanagement/successreportlocker'
import FailReportLocker from '../content/lockermanagement/failreportlocker'
import MapExistedLocker from '../content/usingmanagement/mapexistedlocker'
import SuccessMapExistedLocker from '../content/usingmanagement/successmapexistedlocker'
import FailMapExistedLocker from '../content/usingmanagement/failmapexistedlocker'
import DeleteLocker from '../content/lockermanagement/deletelocker'
import SuccessDeleteLocker from '../content/lockermanagement/successdeletelocker'
import FailDeleteLocker from '../content/lockermanagement/faildeletelocker'

export default class Modal extends React.Component {
    display = 'none';
    opacity = 0;
    isShow = false;
    data = null;
    constructor(props) {
        super(props);
        this.state = {
            isRerender: false,
            display: 'none',
            opacity: 0,
            data: null,
        }
        this.exportUserRef = React.createRef();
        //this.exportUserRef = React.createRef();
        this.exportControlerRef = React.createRef();
        this.exportLockerStatusRef = React.createRef();
        this.exportLockerHistoryRef = React.createRef();
        this.exporMapUserRef = React.createRef();
    }

    onCancelButtonClick = () => {
        setTimeout(() => {
            this.setState({
                display: 'none',
                width: 300,
            })
        }, 200);

        this.setState({
            opacity: 0,
        })
    }

    onModalShow = (data) => {
        this.data = data;
        this.setState({
            display: 'flex',
        });
        setTimeout(() => {
            this.setState({
                opacity: 1,
            });
        }, 50);
    }

    onChangeStatus = (type, code, res) => {
        switch (type) {
            default:
                break;
        }
    }

    renderContent = () => {
        switch (this.props.type) {
            case 'editEmployee':
                return <EditEmployee onCancelClick={this.onCancelButtonClick}
                    data={this.data}/>
            case 'editTagEmployee':
                return <EditTagEmployee onCancelClick={this.onCancelButtonClick} 
                data={this.data} />
            case 'successEditTagEmployee':
                return <SuccessEditTagEmployee onCancelClick={this.onCancelButtonClick} 
                 data={this.data} />
            case 'sendPin':
                return <SendPinConfirm onCancelClick={this.onCancelButtonClick}
                 data={this.data} />
            case 'successSendPin':
                return <SuccessSenPin onCancelClick={this.onCancelButtonClick} 
                 data={this.data} />
            case 'failSendPin':
                return <FailSendPin onCancelClick={this.onCancelButtonClick}
                 data={this.data} />
            case 'mapPinCode':
                return <MapPinCode onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successMapPin': 
                return <SuccessMapPin onCancelClick={this.onCancelButtonClick}
                data ={this.data} />
            case 'unmapPinCode':
                return <UnMapPinCode onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successUnmapPin': 
                return <SuccessUnmapPin onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'unmaptag': 
                return <UnMapTag onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successUnmapTag':
                return <SuccessUnmapTag onCancelClick={this.onCancelButtonClick}
                data ={this.data} />
            case 'editController':
                return <EditController onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successEditController':
                return <SuccessEditController onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failEditController':
                return <FailEditController onCancelClick={this.onCancelButtonClick}
                data = {this.data}/>
            case 'addLoker':
                return <AddLoker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'addEmployee': 
                return <AddEmployee onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successAddEmployee':
                return <SuccessAddEmployee onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddEmployee':
                return <FailAddEmployee onCancelClick={this.onCancelButtonClick}
                 data ={this.data} />
            case 'addBuilding': 
                return <AddBuilding onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successAddBuilding':
                return <SuccessAddBuilding onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddBuilding': 
                return <FailAddBuilding onCancelClick={this.onCancelButtonClick} 
                data = {this.data} />
            case 'addDepartment': 
                return <AddDepartment onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successAddDepartment':
                return <SuccessAddDepartment onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddDepartment': 
                return <FailAddDepartment onCancelClick={this.onCancelButtonClick} 
                data = {this.data} />
            case 'addLevel': 
                return <AddLevel onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successAddLevel':
                return <SuccessAddLevel onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddLevel': 
                return <FailAddLevel onCancelClick={this.onCancelButtonClick} 
                data = {this.data} />
            case 'addController': 
                return <AddController onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successAddController':
                return <SuccessAddController onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddController': 
                return <FailAddController onCancelClick={this.onCancelButtonClick} 
                data = {this.data} />
            case 'addNewMapLocker': 
                return <MapNewLocker onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successAddNewMapLocker':
                return <SuccessMapNewLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failAddNewMapLocker': 
                return <FailMapNewLocker onCancelClick={this.onCancelButtonClick} 
                data = {this.data} />
            case 'lockerOpen':
                return <LockerOpen onCancelClick={this.onCancelButtonClick}
                data = {this.data} />
            case 'successLockerOpen': 
                return <SuccessLockerOpen onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'lockerFree':
                return <LockerFree onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successLockerFree':
                return <SuccessLockerFree onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failLockerFree':
                return <FailLockerFree onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'confirmLocker':
                return <ConfirmLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successConfirmLocker':
                return <SuccessConfirmLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failConfirmLocker':
                return <FailConfirmLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'disableLocker':
                return <DisableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successDisableLocker':
                return <SuccessDisableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failDisableLocker':
                return <FailDisableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'enableLocker':
                return <EnableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successEnableLocker':
                return <SuccessEnableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failEnableLocker':
                return <FailEnableLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'reportLocker':
                return <ReportLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successReportLocker':
                return <SuccessReportLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failReportLocker':
                return <FailReportLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'mapExistedLocker':
                return <MapExistedLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successMapExistedLocker':
                return <SuccessMapExistedLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failMapExistedLocker':
                return <FailMapExistedLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'deleteLocker':
                return <DeleteLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'successDeleteLocker':
                return <SuccessDeleteLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
            case 'failDeleteLocker':
                return <FailDeleteLocker onCancelClick={this.onCancelButtonClick}
                data={this.data} />
        
            default:
                break;
        }
    }

    render() {
        let mainContainer = {
            display: this.state.display,
          width: '100%',
            // width: this.props.type === 'mapExistedLocker' ? '60%' :'100%',
            // width: this.props.type === 'mapExistedLocker' ? '90%' :'95%',
            // marginTop: this.props.type === 'mapExistedLocker' ? '-30px' :'0px',
            // width: this.props.type === 'mapExistedLocker' ? '-60px' :'0px',

            height: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 15,
            opacity: this.state.opacity,
            transition: 'opacity .2s'
        };

        let mainSubContainer = {
            display: this.state.display,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        };

        let mainContent = {
            display: 'flex',
            flexDirection: 'column',
            width: this.props.type === 'addLoker' ? '50%' : 300,
          // width: '300px',
            height: this.props.type === 'mapExistedLocker' ? '90%' : 'auto',
            maxHeight: '90%',
            backgroundColor: 'white',
            border: '.1vh solid red',
            borderRadius: '1vh',
            WebkitBoxShadow: '0.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
            MozBoxShadow: '.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
            boxShadow: '.2vh .2vh .5vh 0 rgba(0,0,0,0.75)',
            padding: '10px 20px 0px 20px',
            position: 'relative',
            transition: 'max-height .5s'
        };

        return (
            <div style={mainContainer}>
                <div style={mainSubContainer}>
                    <div style={styles.mainBlurBackground}>
                    </div>
                    <div style={mainContent}>
                        <div style={styles.logoContainer}>
                            <img src={Logo} style={{ width: '100%', height: '100%' }} alt='' />
                        </div>
                        <div style={styles.logoSub}>
                        </div>
                        {this.renderContent()}
                    </div>
            
                </div>
                
            </div>
        )
    }
}

const styles = {
    logoContainer: {
        position: 'absolute',
        width: 106,
        height: 39,
        top: -28,
        display: 'flex',
        justifyContent: 'center',
        left: 13,
        zIndex: 3,
    },

    logoSub: {
        position: 'absolute',
        width: 97,
        height: 2,
        backgroundColor: 'white',
        zIndex: 1,
        top: -1,
    },

    mainSubContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    mainBlurBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc',
        zIndex: -3,
        opacity: .7
    },

    mainHeader: {
        fontSize: '3vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },

    mainForm: {
        marginTop: 15,
        flex: 1
    },

    mainFooter: {
        marginTop: 70,
        height: 70,
        borderTop: '1px solid red',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}