import React, { Fragment } from 'react'
import Button from '../../common/button'
import User from '../../../core/user'
import ResponseCode from '../../../staticresources/responsecode'
import TableIcons from '../../common/materialicon';
import { red } from '@material-ui/core/colors';

export default class SendPinConfirm extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    onCancelClick = () => {
        //this.props.data.callback();
        this.props.onCancelClick();
    }

    onAcceptClick =() => {
        let eId = this.props.data.empData.eId;
        let email = this.props.data.empData.email;

        console.log(this.props.data.empData.eId);

        return new Promise((resolve, reject) => {
            User.sendPin(eId)
            .then(res => {
                if (res) {
                    if (res.code && res.code === ResponseCode.send_pin_success) {
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

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Gửi PINCode 
                </div>
                <div style= {styles.styleContent}>
                    <div >
                        <TableIcons.Email style={{color: red[500], fontSize: 60}}/>
                    </div>
                    <div>
                        Bạn có chắc chắn muốn gửi mã PINCode không?
                    </div>
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

const styles ={
    styleContent: {
    width: 'auto',
    textAlign: 'center',
    overflow: 'hidden',
    display: 'block',
    padding: '60px 10px',
    fontWeight: 'bold',
    fontSize: '25px'
    },
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