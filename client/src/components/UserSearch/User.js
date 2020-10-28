import React from 'react';
import classes from './User.css';
import {Link} from 'react-router-dom';

const User=(props)=> {
    return (

        <div>
            <div className={classes.userSearch_container} key={props.user.id}>
                <div className={classes.user_container} >
                    <div className={classes.pic_container}>
                        <img src={`${props.user.profilepic}`} 
                        className={classes.user_img}/>
                    </div>
                  <Link to={`/blank/${props.user.id}`} className={classes.username} onClick={props.closeModal}>{props.user.username}</Link>
                </div>
                {props.user.bio ? <div className={classes.comment_text}>{props.user.bio}</div>:null}
                <div className={classes.date}> 10 th</div>
            </div>
        </div>
        
    )
}

export default User;