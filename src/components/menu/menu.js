import React from 'react'
import Logo from '../../imgs/logo.png'
import Avatar from '../../imgs/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircle, faHome, faUser, faUserTag, faUsersCog, faExclamationTriangle,
    faSitemap, faUserLock, faBuilding, faPaperclip,
    faLayerGroup, faTablets, faCube, faCubes,
    faSync, faUnlockAlt, faHistory, faDiceD20,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import SubMenu from './submenu'
import { connect } from 'react-redux'


class Menu extends React.Component {
    logo = Logo;
    navManagerLogoWidth = '25%';
    navManagerDetailWidth = '75%';
    navManagerDetailColor = 'black';
    menuContent = {
        homePage: [
            {
                title: 'Trang chủ',
                icon: faHome,
                tag: 'home',
            }
        ],
        userPage: [
            {
                title: 'Quản lý người sử dụng',
                icon: faUser,
                tag: 'userManage'
            },
            {
                title: 'Quản lý sử dụng thẻ và PINCode',
                tag: 'userTagManage',
                icon: faUserTag,
            },
            {
                title: 'Quản lý bộ phận / phòng ban',
                tag: 'depManage',
                icon: faSitemap,
            },
            {
                title: 'Thêm tủ cho nhân viên',
                tag: 'mapLockerManage',
                icon: faPaperclip,
            },
            {
                title: 'Quản lý sử dụng tủ',
                tag: 'userLockerManage',
                icon: faUserLock,
            },
        ],
        equimentPage: [
            {
                title: 'Quản lý toà nhà',
                tag: 'buildingManage',
                icon: faBuilding,
            },
            {
                title: 'Quản lý tầng',
                tag: 'levelManage',
                icon: faLayerGroup,
            },
            {
                title: 'Quản lý thiết bị điều khiển',
                tag: 'ctlManage',
                icon: faTablets,
            },
            {
                title: 'Quản lý tủ',
                tag: 'lockerManage',
                icon: faCube,
            },
            {
                title: 'Quản lý layout tủ',
                tag: 'layoutManage',
                icon: faCubes,
            },

        ],
        warningPage: [
            {
                title: 'Cảnh báo',
                tag: 'warning',
                icon: faExclamationTriangle,
            },
        ],
        reportPage: [
            {
                title: 'Báo cáo sự kiện theo thời gian thực',
                tag: 'reportRealtime',
                icon: faSync
            },
            {
                title: 'Báo cáo trạng thái',
                tag: 'reportStatus',
                icon: faUnlockAlt,
            },
            {
                title: 'Báo cáo lịch sử sử dụng',
                tag: 'reportHistory',
                icon: faHistory,
            },
        ],
        managePage: [
            {
                title: 'Quản lý tài khoản quản trị',
                tag: 'managerManage',
                icon: faUsersCog,
            },
            {
                title: 'Quản lý quyền hạn của quản trị',
                tag: 'roleManage',
                icon: faDiceD20,
            },
        ]
    }

    constructor() {
        super();
        this.state = {
            navWidth: 45,
            collapse: true,
            navManagerLogoWidth: '100%',
            navManagerDetailWidth: '0%',
            logo: null,
            navManagerDetailColor: '#eee',
           // mActive: 'home',
            barColor: '#888',
            barBackground: 'transparent'
        };
    }

    componentDidMount() {
        // this.setState({
        //     mActive: this.props.tagActive,
        // })
    }

    onNavBarCollapse = (isCollapse) => {
        if (isCollapse) {
            this.navManagerLogoWidth = '100%';
            this.navManagerDetailWidth = '0%';
            this.logo = null;
            this.navManagerDetailColor = '#eee';
        }
        else {
            this.navManagerLogoWidth = '22%';
            this.navManagerDetailWidth = '75%';
            this.logo = Logo;
            this.navManagerDetailColor = 'black';
        }
    }

    onMouseOverBarTab = () => {
        this.setState({
            barColor: 'white',
            barBackground: '#ccc'
        })
    }

    onMouseLeaveBarTab = () => {
        this.setState({
            barColor: '#888',
            barBackground: 'transparent'
        })
    }

    onMouseLeaveNavBar = () => {
        setTimeout(() => {
            if (this.state.navWidth === 300) {
                this.setState({
                    collapse: true,
                    navManagerLogoWidth: '100%',
                    navManagerDetailWidth: '0%',
                    logo: null,
                    navManagerDetailColor: '#eee',
                })
            }
            setTimeout(() => {
                this.setState({
                    navWidth: 45,
                })
            }, 100);
        }, 500);
    }

    onBarButtonClick = () => {
        if (this.state.navWidth === 45) {
            this.setState({
                navManagerLogoWidth: '22%',
                navManagerDetailWidth: '80%',
                logo: Logo,
                navWidth: 300,
                navManagerDetailColor: 'black',
            });
            setTimeout(() => {
                this.setState({
                    collapse: false,
                })
            }, 250);
        }
        else {
            setTimeout(() => {
                if (this.state.navWidth === 300) {
                    this.setState({
                        collapse: true,
                        navManagerLogoWidth: '100%',
                        navManagerDetailWidth: '0%',
                        logo: null,
                        navManagerDetailColor: '#eee',
                    })
                }
                setTimeout(() => {
                    this.setState({
                        navWidth: 45,
                    })
                }, 100);
            }, 100);
        }
    }


    // onNavigation = (tag) => {
    //     this.setState({
    //         mActive: tag,
    //     })
    //     this.props.onNavigation(tag);
    // }

    render() {
        this.onNavBarCollapse(this.props.collapse);
        let navManagerLogo = {
            width: 42,
            height: 42,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'width 0.3s ease-in-out',
        };

        let navManagerDetail = {
            width: this.state.navManagerDetailWidth,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s ease-in-out',
            color: this.state.navManagerDetailColor,
        };

        let navContainer = {
            position: 'absolute',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            height: '100vh',
            backgroundColor: '#ddd',
            overflow: 'hidden',
            opacity: '1',
            width: this.state.navWidth,
            transition: 'width .4s',
        };

        let barTabLogo = {
            fontSize: 16,
            fontWeight: 100,
        };

        let navLogoImg = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            flex: 1
        }

        let barTab = {
            cursor: 'pointer',
            width: 45,
            height: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.barBackground,
            color: this.state.barColor
        }

        return (
            <div style={navContainer}
                onMouseOver={this.onMouseOverNavBar}
                onMouseLeave={this.onMouseLeaveNavBar}>
                <div style={styles.navLogo}>
                    <div style={barTab}
                        onMouseMove={this.onMouseOverBarTab}
                        onMouseLeave={this.onMouseLeaveBarTab}
                        onClick={this.onBarButtonClick}>
                        <FontAwesomeIcon style={barTabLogo} icon={faBars} />
                    </div>
                    <div style={navLogoImg}>
                        <img style={styles.logo} src={this.state.logo} alt='' />
                    </div>
                </div>
                <div>
                    <SubMenu icon={this.menuContent.homePage[0].icon}
                        collapse={this.state.collapse}
                        title={this.menuContent.homePage[0].title}
                        tag={this.menuContent.homePage[0].tag}
                        //navigation={this.onNavigation}
                        active={this.props.tagActive} />
                    {
                        this.menuContent.userPage.map((uPage, index) => {
                            return <SubMenu icon={uPage.icon}
                                collapse={this.state.collapse}
                                key={uPage.tag}
                                title={uPage.title}
                                tag={uPage.tag}
                               // navigation={this.onNavigation}
                                active={this.props.tagActive} />
                        })

                    }
                    {
                        this.menuContent.equimentPage.map((uPage, index) => {
                            return <SubMenu icon={uPage.icon}
                                collapse={this.state.collapse}
                                title={uPage.title}
                                tag={uPage.tag}
                                key={uPage.tag}
                                //navigation={this.onNavigation}
                                active={this.props.tagActive} />
                        })
                    }
                    {
                        this.menuContent.warningPage.map((uPage, index) => {
                            return <SubMenu icon={uPage.icon}
                                collapse={this.state.collapse}
                                title={uPage.title}
                                tag={uPage.tag}
                                key={uPage.tag}
                               // navigation={this.onNavigation}
                                active={this.props.tagActive} />
                        })
                    }
                    {
                        this.menuContent.reportPage.map((uPage, index) => {
                            return <SubMenu icon={uPage.icon}
                                collapse={this.state.collapse}
                                title={uPage.title}
                                tag={uPage.tag}
                                key={uPage.tag}
                                //navigation={this.onNavigation}
                                active={this.props.tagActive} />
                        })
                    }
                    {
                        this.menuContent.managePage.map((uPage, index) => {
                            return <SubMenu icon={uPage.icon}
                                collapse={this.state.collapse}
                                title={uPage.title}
                                tag={uPage.tag}
                                key={uPage.tag}
                               // navigation={this.onNavigation}
                                active={this.props.tagActive} />
                        })
                    }

                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        tagActive: state.tag,
        //valueA: state.a,
    };
})(Menu);

const styles = {

    navLogo: {
        height: 45,
        width: '100%',
        display: 'flex',
        justifyContent: 'flext-start',
        alignItems: 'center',
        boxSizing: 'border-box'
    },

    logo: {
        // width: '90%',
        // height: '33%',
    },

    navManager: {
        height: '6vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0px',
    },

    avatar: {
        width: '90%',
        height: '87%',
        borderRadius: '50%',
    },

    navManagerDetailName: {
        display: 'flex',
        height: '50%',
        width: '100%',
        fontSize: 14,
        alignItems: 'flex-end',
        paddingLeft: '2vh',
        fontWeight: 500,
    },

    navManagerDetailDot: {
        fontSize: 8,
        color: '#3c763d',
        marginTop: '0.3vh'
    },

    navManagerDetailStatus: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: '35%',
        width: '100%',
        paddingLeft: '2vh',
    },
    navManagerStatus: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 600,
        color: '#3c8dbc',
    }
}