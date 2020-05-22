import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons'
import ToolTip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'

class Header extends React.Component {
    headerWarningBorder = 'none';
    headerLogoutBorder = 'none';
    headerWarningBackground = 'transparent';
    headerLogoutBackground = 'transparent';
    constructor(props) {
        super(props);
        this.state = {
            headerWarningColor: '#bbb',
            headerLogoutColor: '#bbb',
        };
    }

    componentDidMount() {

    }

    onWarningMouseEnter = () => {
        this.setState({
            headerWarningColor: '#3c8dbc',
        });
        this.headerWarningBorder = 'rgb(60,141,188, 0.1)';
    }

    onWarningMouseLeave = () => {
        this.setState({
            headerWarningColor: '#bbb',
        });
        this.headerWarningBorder = 'transparent';
    }

    onLogoutMouseEnter = () => {
        this.setState({
            headerLogoutColor: '#E30613',
        });
        this.headerLogoutBorder = 'rgb(227,6,19, 0.1)';
    }

    onLogoutMouseLeave = () => {
        this.setState({
            headerLogoutColor: '#bbb',
        });
        this.headerLogoutBorder = 'transparent';
    }

    onClick = () => {
        this.props.dispatch({
            type: 'warning',
        })

    }

    render() {
        let headerWarning = {
            height: '100%',
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'color .3s',
            color: this.state.headerWarningColor,
            cursor: 'pointer',
            fontSize: 17,
            borderRadius: '50%',

        };

        let headerLogout = {
            height: '100%',
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'color .3s',
            color: this.state.headerLogoutColor,
            cursor: 'pointer',
            fontSize: 17,
            marginRight: 5,
            marginLeft: 5,
            borderRadius: '50%',

        }

        let headerWarningBackground = {
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: this.headerWarningBorder,
            transition: 'background-color 1s',
        }

        let headerLogoutBackground = {
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: this.headerLogoutBorder,
            transition: 'background-color 1s',
        }

        return (
            <div style={styles.headerContainer}>
                <div style={styles.headerManagerDetail}>
                    Xin chào, {localStorage.getItem('name')}
                </div>
                <div style={headerWarning}
                    onMouseOver={this.onWarningMouseEnter}
                    onMouseLeave={this.onWarningMouseLeave}
                    onClick={this.onClick} >
                    <div style={headerWarningBackground}>
                        <FontAwesomeIcon icon={faBell}
                         />
                    </div>
                </div>
                <ToolTip title={'Đăng xuất'}
                        enterDelay={0}>
                    <div style={headerLogout}
                        onMouseOver={this.onLogoutMouseEnter}
                        onMouseLeave={this.onLogoutMouseLeave}
                        onClick={this.props.onLogOutClick}>
                        <div style={headerLogoutBackground}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </div>
                    </div>
                </ToolTip>
            </div>
        );
    }

}

export default connect((state) => {
    return{
        tag: state.tag
    };
})(Header)

const styles = {
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
    },

    headerManagerDetail: {
        height: '100%',
        width: '35vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '1.5vh',
        fontSize: 16
    },
}