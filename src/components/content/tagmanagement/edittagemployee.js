import React, { Fragment } from 'react'
import Button from '../../common/button'
import Input from '../../common/input'
import ResponseCode from '../../../staticresources/responsecode'
import User from '../../../core/user'

export default class EditTagEmployee extends React.Component{

    tagNew = '';
    emailNew = '';

    constructor(props){
        super(props);
        this.state={
        }
        this.inputNameRef = React.createRef();
        this.inputECodeRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputRcodeRef = React.createRef()
    }
    
    onCancelClick = () => {
        this.props.onCancelClick();
    }

    onAcceptClick = () => {

        let eId = this.props.data.empData.eId;
        let name =  this.props.data.empData.name;
        let dId = this.props.data.empData.dId;

        return new Promise((resolve, reject) => {
            User.editUser(eId, name, this.emailNew, dId , this.tagNew)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.modify_emp_success)
                        {
                            resolve();
                            this.props.data.callback();
                        }
                    }
                    resolve();
                })
        });
    }

    onChangeTag  = (value) => {
        this.tagNew = value
    }

    onChangeEmail = (value) => {
        this.emailNew = value;
    //    this.setState({
    //        emailNew2: value,
    //    })
    }

    componentDidMount() {
        this.inputNameRef.current && this.inputNameRef.current.onUpdateDefaultValue(this.props.data.empData.name)
        this.inputECodeRef.current && this.inputECodeRef.current.onUpdateDefaultValue(this.props.data.empData.eCode)
        this.inputEmailRef.current && this.inputEmailRef.current.onUpdateDefaultValue(this.props.data.empData.email)
        this.inputRcodeRef.current && this.inputRcodeRef.current.onUpdateDefaultValue(this.props.data.empData.rCode)
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if(this.props.data !== newProps.data){
            this.inputNameRef.current && this.inputNameRef.current.onUpdateDefaultValue(newProps.data.empData.name)
            this.inputECodeRef.current && this.inputECodeRef.current.onUpdateDefaultValue(newProps.data.empData.eCode)
            this.inputEmailRef.current && this.inputEmailRef.current.onUpdateDefaultValue(newProps.data.empData.email)
            this.inputRcodeRef.current && this.inputRcodeRef.current.onUpdateDefaultValue(newProps.data.empData.rCode)
        }
    }

    render(){

      //  let eCode = this.props.data.empData.eCode;
      //  let name =  this.props.data.empData.name;
        let rCode = this.props.data.empData.rCode;

        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Thay đổi thông tin sử dụng thẻ của nhân viên
                </div>
                <div>
                    <Input 
                    ref={this.inputNameRef}
                    title={'Tên nhân viên'}
                    disabled
                    readonly ={true}
                   // value={name}
                    />
                   
                    <Input
                    ref={this.inputECodeRef}
                    title={'ID nhân sự'}
                    disabled
                    readonly ={true}
                    //value= {eCode}
                    />
                    <Input
                    ref={this.inputEmailRef}
                    title={'Email'}
                   // value= {this.state.emailNew2}
                    onChange={this.onChangeEmail}
                    />
                    <Input
                    ref={this.inputRcodeRef}
                    title={'Mã thẻ từ cũ'}
                    disabled
                    readonly ={true}
                   // value= {rCode}
                    />
                    <Input
                    title ={'Mã thẻ từ mới'}
                    onChange={this.onChangeTag}
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
