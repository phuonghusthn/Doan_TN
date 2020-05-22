import React, { Fragment } from 'react'
import Button from '../../common/button'
import TableIcons from '../../common/materialicon';
import {red} from '@material-ui/core/colors';

export default class FailLockerFree extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    onCancelClick = () => {
        this.props.onCancelClick();
    }

    componentDidMount() {
        console.log(this.props);
    }

    render(){
        return(
            <Fragment>
                <div style={styles.TitleModal} >
                Xoá phiên sử dụng tủ của nhân viên
                </div>
                <div style= {styles.styleContent}>
                    <div>
                        <TableIcons.Healing style={{color: red[500], fontSize: 60}}/>
                    </div>
                    <div>
                    Xoá phiên sử dụng tủ của nhân viên không thành công
                        <div style={styles.linesecond}>
                        Nguyên nhân: <span style={{color: 'red'}}> Tủ đang bị vô hiệu hoá, không thể thực hiện thao tác này</span>
                        </div>
                    </div>
                </div>
                <div style={styles.GroupButton}>
                    <Button onClick={this.onCancelClick}
                    title={'Đồng ý'}/>
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
    fontWeight: 'bold',
    fontSize: '25px',
    padding: '40px 20px'
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
        textAlign: 'center',
    },
    GroupButton: {
        marginTop: '50px',
        height: '70px',
        borderTop: '1px solid red',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    linesecond: {
        fontSize:'16px',
        marginTop: '20px',
        textAlign: 'left'
    }
}