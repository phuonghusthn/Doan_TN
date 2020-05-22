import React from 'react'
import Login from './login/login'
import Container from './container/container'
import DateFnsUtils from '@date-io/date-fns'
import { connect } from 'react-redux'

var md5 = require('md5')

class Main extends React.Component {
    token = '';
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page,
        };
        this.loginRef = React.createRef();
    }

    renderContent = () => {
        switch (this.state.page) {
            case "login":
                return <Login loginSuccess={this.onLoginSuccess} ref={this.loginRef} />;
            case "content":
                return <Container onLogOutClick={this.onLogOutClick} />;
            default:
                return;
        }
    }

    onLogOutClick = () => {
        localStorage.removeItem('token');
        this.setState({
            page: 'login',
        });


        this.loginRef.current && this.loginRef.current.onLoginShow();
    }

    onLoginSuccess = (value) => {
        let username = value.username
        let dt = new Date();
        let min = dt.getUTCMinutes();
        let hrs = dt.getUTCHours();
        if (min < 10 ){
            min = '0' + min;
        }

        if (hrs < 10){
            hrs = '0' + hrs;
        }

        let time = hrs + ':' + min;
        localStorage.setItem('crfs', md5(username + time));
        localStorage.setItem('token', value.token)
        localStorage.setItem('name', value.name);
        setInterval(() => {
            let username = value.username
            let dtz = new Date();
            let minz = dtz.getUTCMinutes();
            let hrsz = dtz.getUTCHours();
            if (minz < 10 ){
                minz = '0' + minz;
            }
    
            if (hrsz < 10){
                hrsz = '0' + hrsz;
            }
    
            let timez = hrsz + ':' + minz;
            localStorage.setItem('crfs', md5(username + timez));
        }, 60000);
        this.setState({
            page: 'content',
        })
    }

    componentDidMount() {
        // this.props.dispatch({
        //     type: 'userManage',
        // })
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default connect()(Main);