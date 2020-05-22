import React, { Fragment } from 'react'

export default class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartDirectionColor: '#2980b9'
        };
    }

    componentDidMount() {

    }

    onMouseClickLink = () => {

    }

    onMouseOverLink = () => {
        this.setState({
            chartDirectionColor: '#e30613',
        })
    }

    onMouseLeaveLink = () => {
        this.setState({
            chartDirectionColor: '#2980b9',
        })
    }

    render() {
        let chartDirect = {
            color: this.state.chartDirectionColor,
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'color .3s'
        };

        return (
            <Fragment>
                <a style={chartDirect}
                    onClick={this.onMouseClickLink}
                    onMouseOver={this.onMouseOverLink}
                    onMouseLeave={this.onMouseLeaveLink}>{this.props.title}</a>
            </Fragment>
        )
    }
}