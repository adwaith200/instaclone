import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{PureComponent} from 'react';
import { Link} from 'react-router-dom';
import classes from './Post.css';
import Comment from '../Comment/Comment';
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/indexActions';


class Post extends PureComponent {

    state={
        comment:null
    }


    commentChangedHandler=(e)=>{
        console.log(e.target.value)

        this.setState({comment:e.target.value})
    }

    postCommentHandler=async(id)=>{
        try{
            console.log(id);
            const response=await axios.post('api/comments/',{
            "comment_text":this.state.comment,
            "post_id":id
        },{
            headers:{
                "Authorization":'Token'+' '+this.props.userKey
        } 
        })
        console.log(response);
        this.props.fetchPosts(this.props.userKey);

    }catch(err){
        console.log(err.response);
    }
    }
    
    render(){
    let comments;
    return (
        <div>
            <div className={classes.post_container}>
                <div className={classes.post_image}>
                    <img className={classes.img_post} src={this.props.image}/>
                </div>
                <div className={classes.post_info}>
                    <div className={classes.user_detail}>
                        <img src={this.props.profilePic} 
                        className={classes.user_image} />
                        <div>
                            <Link to={`/user-profile/${this.props.user_id}`} className={classes.profile_link}>{this.props.userName}</Link>
                        </div>
                    </div>
                    <div className={classes.comments_container}>
                        <div>
                            {this.props.comments.length===0?
                            <h3 style={{textAlign:"center",fontWeight:"bold"}}>Be the first to comment</h3>:
                                comments=this.props.showComments?
                                <div>
                                    <button onClick={this.props.showCommentHandler}>
                                        Hide Comments
                                    </button>
                                    {this.props.comments.map(comment=>{
                                         return <Comment username={comment.user.username}
                                         image={comment.user.profilepic} 
                                         text={comment.comment_text} 
                                         date={comment.created_at} 
                                         key={comment.id}/>
                                    })}
                                    {/* <Comment />
                                    <Comment />
                                    <Comment />
                                    <Comment />
                                    <Comment /> */}
                                </div>:
                                <button onClick={this.props.showCommentHandler}>
                                    show Comments
                                </button>
                            }
                        </div>
                    </div>
                    <div className={classes.likes_date_container}>
                    <div onClick={this.props.liked}>
                        {this.props.num_likes}<FontAwesomeIcon icon='heart' style={{marginLeft:"10px"}} />
                    </div>
                    <div>{this.props.date}</div>
                    </div>
                    {/* <div className={post_caption}>Captions</div> */}
                    <div className={classes.comment_input}>
                        <input type="text" className={classes.comment_add}
                         placeholder="add a comment" defaultValue="" onChange={this.commentChangedHandler}/>
                        <button onClick={()=>this.postCommentHandler(this.props.post_id)}>Post</button>
                    </div>
                    {/* <Redirect to='/' /> */}
                </div>
            </div>
        </div>)
    }
                        
}

const mapStateToProps=(state)=>{
    return {
        userKey:state.auth.userKey,
        post:state.post.posts
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchPosts:(userKey)=>dispatch(actions.fetchPosts(userKey))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);
