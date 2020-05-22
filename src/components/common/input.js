import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField'

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    onUpdateDefaultValue = (value) => {
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <Fragment>
                <TextField label={this.props.title}
                    type={this.props.type}
                    error={this.props.error}
                    variant='outlined'
                    InputProps = {{
                        autoComplete: 'new-password',
                        readOnly: this.props.readonly,
                        endAdornment: this.props.startAdornment,
                    }}
                    disabled={this.props.disabled}
                    placeholder={' '}
                    multiline={this.props.multiline}
                    value={this.state.value}
                    helperText={this.props.helperText}
                    onChange={(event) => {
                        this.setState({
                            value: event.target.value
                          })
                        this.props.onChange(event.target.value);
                    }}
                    fullWidth
                    color='secondary'
                    margin='dense' 
                    />
            </Fragment>
        );
    }
}