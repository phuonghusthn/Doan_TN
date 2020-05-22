import React, { Fragment } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

const CheckBox = (props) => {

    const [state,setState] = React.useState(props.defaultChecked)

    return (
        <Fragment>
            <Checkbox
                defaultChecked={} />
        </Fragment>
    )
}

export default CheckBox