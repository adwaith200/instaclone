import React from 'react';
import {Redirect} from 'react-router-dom';

function Blank(props) {
    return (
        <div>
            <Redirect to={`/user-profile/${props.match.params.userId}`} />
        </div>
    )
}

export default Blank;
