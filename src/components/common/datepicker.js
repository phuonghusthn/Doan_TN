import React, { Fragment } from 'react'
import DateFnsUtils from '@date-io/date-fns'
// import vnLocale from 'date-fns/locale/vi'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'


export default class DatePickers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        }
    }

    componentDidMount(){
        this.setState({
            value: this.props.defaultValue
        })
    }

    render() {
        return (
            <Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker variant='inline'
                        autoOk
                        format='dd/MM/yyyy'
                        margin='dense'
                        inputVariant='outlined'
                        fullWidth
                        label={this.props.title}
                        color='secondary'
                        views={['year','month','date']}
                        onChange={(value) => {
                            this.setState({
                                value: value
                            })
                            this.props.onChange(new DateFnsUtils().format(new Date(value), 'dd/MM/yyyy'))
                        }}
                        value={this.state.value} />
                </MuiPickersUtilsProvider>
            </Fragment >
        )
    }
}