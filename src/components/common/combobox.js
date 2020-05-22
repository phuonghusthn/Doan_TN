import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { withStyles } from '@material-ui/core/styles'

class AutocompleleBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }

    onUpdateDefaultValue = (value) => {
        this.setState({
            value: value
        })
    }

    render() {
        let { classes } = this.props;
        return (
            <Fragment>
                <Autocomplete options={this.props.data}
                    getOptionLabel={this.props.optionLabel}
                    autoComplete
                    includeInputInList
                    onChange={(event, value) => {
                        if (value && value.inputValue) {
                            this.setState({
                                value: value.inputValue,
                            })
                            this.props.onChange(value.inputValue)
                        }
                        else {
                            this.setState({
                                value: value,
                            })
                            this.props.onChange(value)
                        }
                    }}
                    filterOptions={this.props.filterOptions}
                    renderOption={this.props.renderOption}
                    className={classes.root}
                    value={this.state.value}
                    PopperComponent={this.props.PopperComponent}
                    freeSolo={this.props.freeSolo}
                    noOptionsText={'Không tìm thấy kết quả phù hợp'}
                    renderInput={
                        value => {
                            return (<TextField {...value}
                                label={this.props.title}
                                margin='dense'
                                color='secondary'
                                variant='outlined' />)
                        }
                    } />
            </Fragment>
        )
    }
}
const styles = {
    root: {
        width: '100%',
        fontSize: '10px',
    },
    popper: {
        width: '300px',
        margin: '10px',
    }
}

export default withStyles(styles)(AutocompleleBox);