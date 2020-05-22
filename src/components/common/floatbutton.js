import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

class FloatButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        const { position } = this.props;
        let { classes } = this.props;

        let mainButton = {
            position: 'fixed',
            top: position[0],
            bottom: position[1],
            left: position[2],
            right: position[3],
        };
        return (
            <Fragment>
                <div style={mainButton}>
                    <Tooltip title={this.props.title}
                        enterDelay={0}>
                        <Fab className={classes.root}
                            onClick={this.props.onClick}>
                            {this.props.icon}
                        </Fab>
                    </Tooltip>
                </div>
            </Fragment>
        )
    }
}


const styles = {
    root: {
        backgroundColor: '#e30613',
        color: 'white',
        '&:hover': {
            color: '#e30613',
            fontSize: 500
        }
    }
}

export default withStyles(styles)(FloatButton)