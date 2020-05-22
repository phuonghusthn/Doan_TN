import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

class CButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        let { classes } = this.props;
        return (
            <Fragment>
                <Button variant = 'contained'
                    className={classes.root}
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}>
                    {this.props.title}
                </Button>
            </Fragment>
        )
    }
}

const styles = {
    root: {
        width: '100%',
        backgroundColor: '#e30613',
        color: 'white',
        height: '40px',
        '&:hover': {
            color: '#e30613',
            fontWeight: 'bolder',
        }
    }
}

export default withStyles(styles)(CButton);
