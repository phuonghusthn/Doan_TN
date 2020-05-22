import React, { Fragment } from 'react'
import Button from '../../common/button'
import Input from '../../common/input'
import ResponseCode from '../../../staticresources/responsecode'
import Building from '../../../core/building'
import Level from '../../../core/level'
import Combobox from '../../common/combobox'
import Controller from '../../../core/controller'
import { Checkbox } from '@material-ui/core'

export default class AddController extends React.Component{
   
    BIdInput = 0;
    LlvInput = 0;
    ImeiInput = '';
    MacInput = '';
    ZoneInput = '';

    LDesInput = '';
    DictBName = {};
    Build = [];
    DictBId = {};

    DictLvName = {};
    DictLvId ={};
    Level =[];

    

    constructor(props){
        super(props);
        this.state={
            BIdSelected: 0,
        }
    }

    componentDidMount(){
        
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

    onAcceptClick = () => {
        return new Promise((resolve, reject) => {
            Controller.createController(this.BIdInput, '', this.ImeiInput, this.LlvInput, this.MacInput, this.ZoneInput)
            .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.create_ctl_success)
                        {
                            resolve();
                            this.props.data.callback();
                        }
                        else {
                            this.props.data.callbackfail();
                        }
                    }
                    resolve();
                })
        });

    }
    
    onCancelClick = () => {
        //this.props.data.callback();
        this.props.onCancelClick();
    }

    onChangeImei = (value) => {
        this.ImeiInput = value;
    }

    onChangeMac = (value) => {
        this.MacInput = value;
    }

    onChangeName = (value) => {
        this.BIdInput = this.DictBId[value];
        this.setState({
            //BIdSelected: this.DictBId[value],
        })
    }

    UNSAFE_componentWillReceiveProps(newProps){
        
        this.setState({
            BIdSelected: this.DictBId[newProps.bName],
        })
    }

    onChangeLevel = (value) => {
        this.LlvInput = this.DictLvId[value];
    }

    onChangeDes = (value) => {
        this.LDesInput = value;
    }

    onChangeZone = (value) => {
        this.ZoneInput =  value;
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Thêm tòa nhà mới 
                </div>
                <div>
                    <Input 
                    title={'IMEI'}
                    onChange={this.onChangeImei}
                    />
                    <Input 
                    title={'Địa chỉ Mac'}
                    onChange={this.onChangeMac}
                    />
                    <Combobox 
                    title={'Tên tòa nhà'}
                    data = {this.Build}
                    onChange={this.onChangeName}
                    />
                    <Combobox 
                    title={'Tầng'}
                    data = {this.Level}
                    onChange={this.onChangeLevel}
                    />
                    <Input 
                    title={'Khu vực'}
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

