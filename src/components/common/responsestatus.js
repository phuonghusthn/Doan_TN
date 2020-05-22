import React, { Fragment } from 'react'
import Button from './button'
import Loading from '../../imgs/loadingdot.svg'
import Done from '@material-ui/icons/DoneAllOutlined'
import Healing from '@material-ui/icons/HealingOutlined'

export default class ResponseStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthLoading: 'auto',
            widthRepsone: 0,
            isSuccess: true,
            display: 'none',
            disabled: true,
            reason: '',
            displayFooter: 'none',
        }
    }

    onLoadingSuccessful = (code, res) => {
        if (typeof (code) === 'undefined') {
            this.setState({
                widthLoading: 0,
                widthRepsone: 'auto',
                isSuccess: true,
                display: 'block',
                disabled: false,
                title: '',
                displayFooter: 'flex',
            })
        }
        else {
            this.setState({
                widthLoading: 0,
                widthRepsone: 'auto',
                isSuccess: false,
                display: 'block',
                disabled: false,
                title: res.message,
                displayFooter: 'flex',
            })
        }
    }

    render() {

        let LoadingStatus = {
            width: this.state.widthLoading,
        }

        let ResponseStatus = {
            width: this.state.widthRepsone,
            textAlign: 'center',
            overflow: 'hidden',
            display: this.state.display
        };
        let mainFooter = {
            marginTop: 50,
            height: 70,
            borderTop: '1px solid red',
            display: this.state.displayFooter,
            justifyContent: 'space-between',
            alignItems: 'center'
        };

        const { title, successLabel, unsuccessLabel, successButtonLabel, contiunueButtonLabel } = this.props;

        return (
            <Fragment>
                <div style={styles.mainHeader}>
                    {title}
                </div>
                <div>
                    <div style={styles.mainFormResponse}>
                        <img src={Loading} alt='' style={LoadingStatus} />
                        <div style={ResponseStatus}>
                            {
                                this.state.isSuccess ?
                                    <Fragment>
                                        <Done style={styles.iconStyle} />
                                        <h2 style={{ marginTop: 0 }}>
                                            {successLabel}
                                        </h2>
                                    </Fragment> :
                                    <Fragment>
                                        <Healing style={styles.iconStyleFailed} />
                                        <h2 style={{ marginTop: 0 }}>
                                            {unsuccessLabel}
                                        </h2>
                                        <div style={styles.reason}>
                                            <span style={{ fontWeight: 600 }}>Nguyên nhân: </span>
                                            <span style={{ color: 'red', fontWeight: 600 }}>{this.state.title}</span>
                                        </div>
                                    </Fragment>
                            }
                        </div>
                    </div>
                    <div style={mainFooter}>
                        {this.props.oneButtonConfirm ?
                            <Fragment>
                                <div style={{
                                    width: '100%'
                                }}>
                                    <Button title={successButtonLabel}
                                        onClick={() => {
                                            this.setState({
                                                widthLoading: 'auto',
                                                widthRepsone: 0,
                                                isSuccess: true,
                                                display: 'none',
                                                disabled: true,
                                                reason: '',
                                                displayFooter: 'none',
                                            })
                                            this.props.onDoneClick();
                                        }} />
                                </div>
                            </Fragment> :
                            <Fragment>
                                <div style={{
                                    width: '47%'
                                }}>
                                    <Button title={successButtonLabel}
                                        onClick={() => {
                                            this.setState({
                                                widthLoading: 'auto',
                                                widthRepsone: 0,
                                                isSuccess: true,
                                                display: 'none',
                                                disabled: true,
                                                reason: '',
                                                displayFooter: 'none',
                                            })
                                            this.props.onDoneClick();
                                        }} />
                                </div>
                                <div style={{
                                    width: '47%'
                                }}>
                                    <Button title={contiunueButtonLabel}
                                        onClick={() => {
                                            this.setState({
                                                widthLoading: 'auto',
                                                widthRepsone: 0,
                                                isSuccess: true,
                                                display: 'none',
                                                disabled: true,
                                                reason: '',
                                                displayFooter: 'none',
                                            })
                                            this.props.onContinueClick()
                                        }}
                                        disabled={this.state.disabled} />
                                </div>
                            </Fragment>}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const styles = {
    iconStyle: {
        fontSize: 60,
        color: 'green'
    },

    iconStyleFailed: {
        fontSize: 60,
        color: '#e30613'
    },

    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '20vw',
        backgroundColor: 'white',
        border: '.1vh solid red',
        borderRadius: '1vh',
        webkitBoxShadow: '0.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
        mozBoxShadow: '.2vh .2vh .5vh 0vh rgba(0,0,0,0.75)',
        boxShadow: '.2vh .2vh .5vh 0 rgba(0,0,0,0.75)',
        padding: '10px 20px 0px 20px',
    },

    mainHeader: {
        fontSize: '21px',
        fontWeight: 600,
        color: '#e30613',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        paddingTop: 25,
        paddingBottom: 15,
        textAlign: 'center'
    },

    mainForm: {
        marginTop: 15,
        flex: 1,
    },

    mainFormResponse: {
        marginTop: 15,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 250,
        marginBottom: 40,
    },
    reason: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'left',
    }
}