import React, { Fragment } from 'react'
import Button from '../../common/button'
import Input from '../../common/input'
import ResponseCode from '../../../staticresources/responsecode'
import Building from '../../../core/building'
import Level from '../../../core/level'
import Combobox from '../../common/combobox'

export default class AddLevel extends React.Component{
   
    BIdInput = 0;
    LlvInput = 0;
    LDesInput = '';
    DictBName = {};
    Build = [];
    DictBId = {};

    constructor(props){
        super(props);
        this.state={

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
    }

    onAcceptClick = () => {
        return new Promise((resolve, reject) => {
            Level.createLevel(this.BIdInput, this.LDesInput, this.LlvInput)
            .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.create_lvl_success)
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

    onChangeName = (value) => {
        this.BIdInput = this.DictBId[value];
    }

    onChangeLevel = (value) => {
        this.LlvInput = value;
    }

    onChangeDes = (value) => {
        this.LDesInput = value;
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Thêm tòa nhà mới 
                </div>
                <div>
                    <Combobox 
                    title={'Tên tòa nhà'}
                    data = {this.Build}
                    onChange={this.onChangeName}
                    />
                    <Input 
                    title={'Tầng'}
                    onChange={this.onChangeLevel}
                    />
                    <Input 
                    title={'Thông tin chi tiết'}
                    onChange={this.onChangeDes}
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

