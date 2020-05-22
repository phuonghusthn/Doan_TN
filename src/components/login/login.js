import React from 'react';
import Logo from '../../imgs/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import Typing from 'react-typing-animation';
import LoginForm from './loginform';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            opacity: 0,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacity: 1
            })
        }, 2000);
    }

    onLoginShow = () => {
        setTimeout(() => {
            this.setState({
                opacity: 1
            })
        }, 2000);
    }

    render() {
        let loginForm = {
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: this.state.opacity,
            transition: 'opacity 3s'
        };
        return (
            <div style={styles.mainContainer}>
                <div style={styles.container}>
                    <div style={styles.branch}>
                        <div style={styles.logo}>
                            <object style={styles.imgLogo} type="image/svg+xml" data={Logo} alt=''></object>
                        </div>
                        <div style={styles.name}>
                            <Typing speed={30} >
                                <Typing.Delay ms={300} />
                                <span style={styles.nameFont}><span style={{ color: '#E1282E' }}>SM<FontAwesomeIcon icon={faUnlock}  style={{marginRight: 12}}/>RT</span><span style={{ color: '#242021' }}>LOCKER</span></span>
                            </Typing>
                        </div>
                    </div>
                    <div style={loginForm}>
                        <LoginForm loginSuccess={this.props.loginSuccess} />
                    </div>
                </div>
            </div>
        );
    }
}


const styles = {
    mainContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        flex: 1,
        height: '100vh',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        height: '80%',
        display: 'flex',
    },

    branch: {
        flex: 4,
    },

    logo: {
        flex: 1,
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgLogo: {
        width: '85%',
        height: '85%',
        animation: 'scale 2.5s linear forwards'
    },

    name: {
        flex: 1,
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    nameFont: {
        fontSize: 70,
        fontWeight: 700,
        letterSpacing: '2vh',
    },
};