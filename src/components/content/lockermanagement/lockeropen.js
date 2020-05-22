import React, { Fragment } from 'react'
import Button from '../../common/button'
import Locker from '../../../core/locker'
import ResponseCode from '../../../staticresources/responsecode'
import { green } from '@material-ui/core/colors';
import LockOpen from '@material-ui/icons/LockOpen'


export default class LockerOpen extends React.Component{
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
        let lId = this.props.data.locker.lId 
        return new Promise((resolve, reject) => {
            Locker.openLocker(lId)
            .then(res => {
                if (res) {
                    if (res.code && res.code === ResponseCode.open_locker_success) {
                        resolve();
                        this.props.data.callback();
                    }
                    else {
                        //this.props.data.callbackFail();
                    }
                }
                resolve();

            })

        });
    }

    componentDidMount() {
     console.log(this.props);
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                Gửi yêu cầu mở tủ đến thiết bị điều khiển
                </div>
                <div style= {styles.styleContent}>
                    <div >
                        <LockOpen style={{color: green[500], fontSize: 60}}/>
                    </div>
                    <div>
                        Bạn có chắc chắn muốn thực hiện hành động này?
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