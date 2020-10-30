import React from 'react';
import classes from './Comment.css'

const Comment=(props)=> {
    console.log(props.modalImage,"modal")
    return (

        <div>
            <div className={classes.comment_container}>
                <div className={classes.user_container} >
                    <div className={classes.pic_container}>
                        <img src={`${props.image}` } 
                        className={classes.user_img}/>
                    </div>
                    <div className={classes.username}>{props.username}</div>
                </div>
                <div className={classes.comment_text}>{props.text}</div>
                <div className={classes.date}> 10 th</div>
            </div>
        </div>
        
    )
}

export default Comment
