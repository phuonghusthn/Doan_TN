import React, { Fragment } from 'react'
import Button from '../../common/button'
import TableIcons from '../../common/materialicon';
import { green } from '@material-ui/core/colors';


export default class SuccessMapExistedLocker extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    onCompleteClick = () => {
        this.props.data.callback();
        this.props.onCancelClick();
    }
    
    // onContinueClick = () => {
    //     this.props.data.callbackContinue()
    // }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                    Đăng ký tủ cho nhân viên
                </div>
                <div style= {styles.styleContent}>
                    <div>
                        <TableIcons.DoneAll style={{ color: green[500], fontSize: 60}}/>
                    </div>
                    <div>
                    Đăng ký tủ nhân viên thành công
                    </div>
                </div>
            
                <div style={styles.GroupButton}>
                    <Button onClick={this.onCompleteClick}
                    title={'Hoàn thành'}/>
                </div>

            </Fragment>
        )
    }
}

const styles ={
    iconStyle: {
        color: 'green',
        fontSize: '60px'
    },
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