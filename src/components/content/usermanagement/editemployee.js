import React, { Fragment } from 'react'
import Button from '../../common/button'

export default class EditEmployee extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    onCancelClick = () => {
        this.props.data.callback('xin chào');
        this.props.onCancelClick();
    }

    render(){
        return(
          <Fragment>
              <Button onClick={this.onCancelClick}
                title={'Huỷ'}/>
          </Fragment>
        )
    }
}
