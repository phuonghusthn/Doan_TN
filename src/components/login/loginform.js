import React from 'react'
import Logo_sm from '../../imgs/logo.png';
import Input from '../common/input';
import Auth from '../../core/auth';
import Button from '../common/button'
import Account from '@material-ui/icons/PersonOutlined'
import Password from '@material-ui/icons/VpnKeyOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'

export default class LoginForm extends React.Component {
    username = '';
    password = '';
    constructor() {
        super();
        this.state = {
            opacity: 0,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onEnterPress, false);
    }

    onEnterPress = (event) => {
        if (event.which === 13){
            this.onLoginClick();
        }
    }

    onUserChange = (value) => {
        this.username = value;
        this.setState({
            opacity: 0,
            pwdError: false,
            helperText: '',
        })
    }

    onPasswordChange = (value) => {
        this.password = value;
        this.setState({
            pwdError: false,
            helperText: '',
        })
    }

    onLoginClick = () => {
        Auth.sendAuthenticateRequest(this.username, this.password)
            .then(value => {
                if (value) {
                    if (value.code === 0) {
                        this.setState({
                            pwdError: true,
                            helperText: 'Tên đăng nhập/mật khẩu không đúng!!!'
                        })
                    }
                    else {
                        this.props.loginSuccess(value);
                    }
                }
                else {
                    this.setState({
                        pwdError: true,
                        helperText: 'Hệ thống đang bận. Vui lòng thử lại sau!!!'
                    })
                }
            });
    }

    render() {
        return (
            <div style={styles.loginContainer}>
                <div style={styles.imgContainer}>
                    <img style={styles.imgLoginForm} src={Logo_sm} alt='' />
                </div>
                <div style={styles.inputContainer}>
                    <Input title={'Tên đăng nhập'}
                        type={'text'}
                        class={'focusInput'}
                        onChange={this.onUserChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <Account color='secondary' />
                            </InputAdornment>
                        } />
                    <Input title={'Mật khẩu'}
                        type={'password'}
                        class={'focusInput'}
                        onChange={this.onPasswordChange}
                        error={this.state.pwdError}
                        helperText={this.state.helperText}
                        startAdornment={
                            <InputAdornment position="start">
                                <Password color='secondary' />
                            </InputAdornment>
                        } />
                    <div style={{ marginTop: 10 }}>
                        <Button style={styles.loginButton}
                            onClick={this.onLoginClick}
                            title={'Đăng nhập'} />
                    </div>
                </div>
            </div>
        );
    }
}


const styles = {
    loginContainer: {
        height: 450,
        width: 270,
        justifyContent: 'center',
        alignItems: 'center',
        border: '0.1vh solid #E30613',
        padding: '2vh',
        WebkitBoxShadow: '0.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
        MozBoxShadow: '.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
        boxShadow: '.2vh .2vh .5vh 0 rgba(0,0,0,0.75)',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '0.5vh',
    },

    imgContainer: {
        flex: 1,
        height: '30%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 20,
    },

    inputContainer: {
        flex: 1,
        height: '16vh',
    },

    imgLoginForm: {
        transformOrigin: 'center',
        transform: 'scale(1.25)'
    },

    loginButton: {
        width: '100%',
        background: '#E30613',
        color: 'white',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        padding: '0.8vh',
        borderRadius: '0.5vh',
        marginTop: '0.5vh',
        fontSize: '1.7vh',
    },
}