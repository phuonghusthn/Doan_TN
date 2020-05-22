import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'

class SubMenu extends React.Component {
    subMenuIconWidth = '20%';
    subMenuContentWidth = '80%';
    subMenuContentColor = 'black';
    constructor() {
        super();
        this.state = {
            subMenuContainerColor: 'transparent',
            subMenuIconWidth: '100%',
            subMenuContentWidth: '0%',
            subMenuDisplay: 'none',
            subMenuContentOpacity: 0,
        };
    }

    componentDidMount() {
        this.setState({
            subMenuContainerColor: this.props.active === this.props.tag ? '#ccc' : 'transparent'
        })
       // console.log(this.props);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props)
            this.props = newProps;
        this.onNavBarCollapse();
    }

    onNavBarCollapse = () => {
        if (this.props.collapse) {
            this.setState({
                subMenuIconWidth: '100%',
                subMenuContentWidth: '0%',
                subMenuDisplay: 'none',
                subMenuContainerColor: this.props.active === this.props.tag ? '#ccc' : 'transparent',
            });
            setTimeout(() => {
                this.setState({
                    subMenuContentOpacity: 0,
                })
            }, 100);
        }
        else {
            this.setState({
                subMenuIconWidth: '15%',
                subMenuContentWidth: '85%',
                subMenuDisplay: 'flex',
                subMenuContainerColor: this.props.active === this.props.tag ? '#ccc' : 'transparent',
            });
            setTimeout(() => {
                this.setState({
                    subMenuContentOpacity: 1
                });
            }, 100);
        }
    }

    // onNavigation = () => {
    //     this.props.navigation(this.props.tag);
    // }

    onMouseOverSubMenu = () => {
        this.setState({
            subMenuContainerColor: '#ccc',
        })
    }

    onMouseLeaveSubMenu = () => {
        this.setState({
            subMenuContainerColor: this.props.active === this.props.tag ? '#ccc' : 'transparent',
        })
    }

    onClick = () => {
        this.props.dispatch({
            type: this.props.tag,
        })
    }

    render() {
        let subMenuIcon = {
            width: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 14,
            height: 18,
            transition: 'width 0.4s',
            color: '#E30613',
        };

        let subMenuContent = {
            flex: 1,
            overflow: 'hidden',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 500,
            opacity: this.state.subMenuContentOpacity,
            transition: 'display .4s, opacity .3s, width .3s'
        }

        let subMenuContainer = {
            width: '100%',
            padding: '6px 0px',
            cursor: 'pointer',
            backgroundColor: this.state.subMenuContainerColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 22,
        };
        return (
            <Fragment>
                <Tooltip title={this.props.title}
                    enterDelay={100}>
                    <div style={subMenuContainer}
                        //onClick={this.onNavigation}
                        onClick = {this.onClick}
                        onMouseOver={this.onMouseOverSubMenu}
                        onMouseLeave={this.onMouseLeaveSubMenu}>
                        <div style={subMenuIcon}>
                            <FontAwesomeIcon icon={this.props.icon} />
                        </div>
                        <div style={subMenuContent}>
                            {this.props.title}
                        </div>
                    </div>
                </Tooltip>
            </Fragment>
        );
    };
}

export default connect((state) => {
    return {
        tagSelected: state.tag,
    };
})(SubMenu);