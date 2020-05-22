import React, { Fragment } from 'react'
import Button from '../../common/button'
import Input from '../../common/input'
import ResponseCode from '../../../staticresources/responsecode'
import Department from '../../../core/department'

export default class AddEmployee extends React.Component{
   
    DepNameInput = '';

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
    }

    onAcceptClick = () => {
        return new Promise((resolve, reject) => {
            Department.createDepartment(this.DepNameInput)
                .then(res => {
                    if (res) {
                        if (res.code && res.code === ResponseCode.create_dep_success)
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
        this.DepNameInput = value;
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Thêm bộ phận/phòng ban mới 
                </div>
                <div>
                    <Input 
                    title={'Tên bộ phận/ phòng ban'}
                    onChange={this.onChangeName}
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

