import React from 'react';
import classes from './Post.css'

const Post=(props)=> {
    return (
        <div>
            <div className={classes.post_container}>
                <div className={classes.post_image}>
                    <img className={classes.img_post} src={props.image}/>
                </div>
                <div className={classes.post_info}>
                    <div className={classes.user_detail}>
                        <img src={props.profilePic} 
                        className={classes.user_image} />
                        <div>{props.userName}</div>
                    </div>
                    <div className={classes.comments_container}>{props.comments}</div>
                    <div className={classes.likes_date_container}>
                    <div>{props.num_likes}</div>
                    <div>{props.date}</div>
                    </div>
                    {/* <div className={post_caption}>Captions</div> */}
                    <div className={classes.comment_input}>add_comment</div>
                </div>
            </div>
        </div>
    )
}

export default Post;
