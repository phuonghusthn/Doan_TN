import React, { Fragment } from 'react'
import Button from '../../common/button'
import ResponseCode from '../../../staticresources/responsecode'
import User from '../../../core/user'
import CheckBox from '../../common/checkbox'

export default class MapNewLoker extends React.Component{
    
    checkedReuse = false;

    constructor(props){
        super(props);
        this.state={
            BIdSelected: 0,
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    onAcceptClick = () => {
        let listEmployee = this.props.data.dataListEmp;
        let listLocker = this.props.data.dataListLocker;
        return new Promise((resolve, reject) => {
            User.mapNewLocker(listEmployee, listLocker, this.checkedReuse)
            .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.map_user_locker_success)
                        {
                            resolve();
                            this.props.data.callback();
                           // this.props.data.callbackfail();
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

    onCheckedReuse = (data, status) => {
        if(status) {
            this.checkedReuse = true;
        }
        else {
            this.checkedReuse = false;
        }
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Đăng ký tủ nhân viên 
                </div>
                <div>
                    <div style={styles.information}>Số lượng nhân viên: {this.props.data.dataListEmp.length}</div>
                    <div style={styles.information}>Số lượng nhân tủ: {this.props.data.dataListLocker.length}</div>
                    <CheckBox 
                    checked={false}
                    onChange ={ this.onCheckedReuse}
                    title={'Cho phép nhóm các nhân viên cũ tiếp tục sử dụng các tủ đã được phân trước đó và ngược lại' }                   
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
    },

    information: {
        padding: '10px',
        fontWeight: 'bold',
    }

}

