import React from 'react';
import {Redirect,withRouter} from 'react-router-dom';

class Blank extends React.PureComponent {
    render(){
        console.log(this.props)
        console.log(this.props.userId,this.props.match.params.userId);
    return (
        <div>
            {this.props.userId!==this.props.match.params.userId*1?
            <Redirect to={`/user-profile/${this.props.match.params.userId}`} />:
            <Redirect to='/profile'/>
        }
        </div>
    )
    }
}

export default withRouter(Blank);
