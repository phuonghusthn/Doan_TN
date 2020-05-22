import React, { Fragment } from 'react'
import Logo from '../../imgs/logo.png'
import Dot from '../../imgs/loadingdot.svg'

export default class LoadingLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Fragment >
                <img style={styles.loadingImg}
                    x={'0'}
                    y={'0'}
                    width={'106'}
                    height={'39'}
                    src={Logo}
                    alt='loadingLogo' />
            </Fragment>
        )
    }
}

const styles = {
    loadingImg: {
        transfromOrigin: '50% 50%',
        animation: '0.925926s linear 0s infinite normal forwards running breathLoading'
    }
}