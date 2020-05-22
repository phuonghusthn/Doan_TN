import React, { Fragment } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            checked: newProps.checked,
        })
    }

    onChangeClick = (event) => {
        this.props.onChange(this.props.data, event.target.checked);
        this.setState({
            checked: event.target.checked
        })
    }

    render() {
        return (
            <Fragment>
                {this.props.title === 'undefined' ?
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.onChangeClick} /> :
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checked}
                            onChange={this.onChangeClick} />}
                        label={this.props.title}
                    />}
            </Fragment>
        )
    }

}