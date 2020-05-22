import React, { Fragment } from 'react'
import Button from '../../common/button'
import Combobox from '../../common/combobox'
import Input from '../../common/input'
import ResponseCode from '../../../staticresources/responsecode'
import Controller from '../../../core/controller'
import Building from '../../../core/building';
import Level  from '../../../core/level';

export default class EditController extends React.Component{

    tagNew = '';
    DictBName = {};
    Build = [];
    DictBId = {};
    DictLvName = {};
    DictLvId ={};
    Level =[];
    imeiNew = this.props.data.ctlData.imei;
    macNew = this.props.data.ctlData.mac;
    zoneNew = this.props.data.ctlData.zone;
    BIdNew = this.props.data.ctlData.bId;
    LvIdNew = this.props.data.ctlData.lId;

    constructor(props){
        super(props);
        this.state={
            isUpdateView: false,
        }
        this.comboboxRef = React.createRef();
        this.inputIMEIRef = React.createRef();
        this.inputMacRef = React.createRef();
        this.inputZoneRef = React.createRef();
        this.comboboxLevelRef = React.createRef();

    }
    
    onCancelClick = () => {
        this.props.onCancelClick();
    }

    onAcceptClick = () => {

         let cId = this.props.data.ctlData.cId;
         let des =  this.props.data.ctlData.des;
        
        return new Promise((resolve, reject) => {
            Controller.editController(cId, des, this.BIdNew, this.LvIdNew, this.imeiNew, this.macNew, this.zoneNew)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_ctl_success)
                        {
                            resolve();
                            this.props.data.callback();
                        }
                        else {
                            this.props.data.callbackFail();
                        }
                    }
                    resolve();
                })
        });
    }

    componentDidMount() {
        console.log("componentDidMount");
        let lLevel = 'Tầng ' + this.props.data.ctlData.lLv + ' Tòa '+ this.props.data.ctlData.bName;
        this.comboboxRef.current && this.comboboxRef.current.onUpdateDefaultValue(this.props.data.ctlData.bName)
        this.inputIMEIRef.current && this.inputIMEIRef.current.onUpdateDefaultValue(this.props.data.ctlData.imei);
        this.inputMacRef.current && this.inputMacRef.current.onUpdateDefaultValue(this.props.data.ctlData.mac);
        this.inputZoneRef.current && this.inputZoneRef.current.onUpdateDefaultValue(this.props.data.ctlData.zone);
        this.comboboxLevelRef.current && this.comboboxLevelRef.current.onUpdateDefaultValue(lLevel);
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

        Level.getLevel()
        .then(value => {
            if(value){
                if(value.items.length >0) {
                    value.items.map((item, index) => {
                        let bLv = ' Tòa ' + item.bName + ' - Tầng '  + item.lLv;
                        this.DictLvName[item.lId] = bLv;
                        this.DictLvId[bLv] = item.lId;
                        this.Level[index] = bLv ;
                    }) 
                }
            }
        });
    }

    onChangeMac = (value) => {
        this.macNew = value;
    }

    onChangeImei = (value) => {
        this.imeiNew = value;
    }

    onChangeZone =(value) => {
        this.zoneNew = value;
    }

    onChangeBLevel = (value) => {
        this.LvIdNew = this.DictLvId[value];
    } 

    onChangeBuild = (value) => {
        this.BIdNew = this.DictBId[value];
    }

    UNSAFE_componentWillReceiveProps(newProps){
        console.log('componentWillReceiveProps');
        console.log(this.props);
        console.log(newProps);
        if(this.props.data !== newProps.data){
            let lLevel = 'Tầng ' + newProps.data.ctlData.lLv + ' Tòa '+ newProps.data.ctlData.bName;
            this.comboboxRef.current && this.comboboxRef.current.onUpdateDefaultValue(newProps.data.ctlData.bName);
            this.inputIMEIRef.current && this.inputIMEIRef.current.onUpdateDefaultValue(newProps.data.ctlData.imei);
            this.inputMacRef.current && this.inputMacRef.current.onUpdateDefaultValue(newProps.data.ctlData.mac);
            this.inputZoneRef.current && this.inputZoneRef.current.onUpdateDefaultValue(newProps.data.ctlData.zone);
            this.comboboxLevelRef.current && this.comboboxLevelRef.current.onUpdateDefaultValue(lLevel);
    
        }
    }

    render(){
        let lLv = this.props.data.ctlData.lLv;

        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Thay đổi thông tin thiết bị điều khiển
                </div>
                <div style={{marginTop: '30px'}}>
                    <Input 
                    ref={this.inputIMEIRef}
                    title={'IMEI'}
                    //value={imei}
                    onChange={this.onChangeImei}
                    />
                   
                    <Input
                    ref={this.inputMacRef}
                    title={'Địa chỉ MAC'}
                   // value= {mac}
                    onChange={this.onChangeMac}
                    />
                    <Combobox
                    ref={this.comboboxRef}
                    //value={bName}
                    title={'Tòa'}
                    data = {this.Build}
                    onChange = {this.onChangeBuild}
                    />
                    <Combobox
                    ref={this.comboboxLevelRef}
                    value={lLv}
                    title={'Tầng'}
                    data = {this.Level}
                    onChange = {this.onChangeBLevel}
                    />
                    <Input
                    ref={this.inputZoneRef}
                    title ={'Khu vực'}
                    //value={zone}
                    onChange={this.onChangeZone}
                    />
                </div>
                <div style={styles.GroupButton}>
                    <div style={styles.ButtonStyle}>
                        <Button onClick={this.onCancelClick}
                        title={'Hủy'}/>
                    </div>
                    <div style={styles.ButtonStyle}>
                        <Button 
                        title={'Đồng ý'}
                        onClick={this.onAcceptClick}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const styles = {

    TitleModal: {
        fontSize: '21px',
        fontWeight: 600,
        color: 'rgb(227, 6, 19)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30px',
        paddingTop: '25px',
        paddingBottom: '15px',
        textAlign: 'center'
    },

    GroupButton: {
        marginTop: '50px',
        height: '70px',
        borderTop: '1px solid red',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ButtonStyle: {
        width: '47%',
    }

}
