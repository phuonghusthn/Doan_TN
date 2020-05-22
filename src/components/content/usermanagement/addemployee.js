import React, { Fragment } from 'react'
import Button from '../../common/button'
import Input from '../../common/input'
import Checkbox from '../../common/checkbox'
import User from '../../../core/user'
import ResponseCode from '../../../staticresources/responsecode'
import Department from '../../../core/department'
import Combobox from '../../common/combobox';
import Tag from '../../../core/tag'

export default class AddEmployee extends React.Component{
    NameInput = '';
    EcodeInput = '';
    EmailInput = '';
    DepInput = '';
    DepIdInput = 0;
    RcodeInput = '';
    PinInput = true;
    Dep = [];
    dictDev = {};
    dictDid = {};
    Tag = [];
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
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

        Tag.getFreeTag() 
        .then( value => {
            if(value) {
                if(value.items.length >0) {
                    //console.log(value);
                    value.items.map((item, index) => {
                        this.Tag[index] = item.tTag
                    })
                }
            }
        })
    }

    onAcceptClick = () => {
        return new Promise((resolve, reject) => {
            User.createUser(this.NameInput, this.EcodeInput, this.EcodeInput,this.DepIdInput, this.RcodeInput, this.PinInput )
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.create_emp_success)
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
        this.props.data.callback();
        this.props.onCancelClick();
    }

    onChangeName = (value) => {
        this.NameInput = value;
    }

    onChangeEcode = (value) => {
        this.EcodeInput = value;
    }

    onChangeEmail = (value) => {
        this.EmailInput = value;
    }

    onChangeDepartment = (value) => {
        this.DepIdInput = this.dictDid[value]
    }

    onChangeRcode =(value) => {
        this.RcodeInput = value
    }

    onChangePin = (value, status) => {

    }

    render(){
        return(
          <Fragment>
                <div style={styles.TitleModal} >
                    Thêm nhân viên mới
                </div>
                <div>
                    <Input 
                    title={'Tên nhân viên'}
                    onChange={this.onChangeName}
                    />
                   
                    <Input
                    title={'ID nhân sự'}
                    onChange={this.onChangeEcode}
                    />
                    <Input
                    title={'Email'}
                    onChange={this.onChangeEmail}

                    />
                    <Combobox
                    title={'Bộ phận làm việc'}
                    data = {this.Dep}
                    onChange={this.onChangeDepartment}
                    />
                    <Combobox
                    title ={'Mã thẻ từ'}
                    data = {this.Tag}
                    onChange={this.onChangeRcode}
                    />
                    <Checkbox 
                    title ={'Tạo PinCode'}
                    onChange={this.onChangePin}
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

