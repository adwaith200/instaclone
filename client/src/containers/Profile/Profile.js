import React from 'react';
import classes from './Profile.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Post from '../../components/Post/Post';

class Profile extends React.Component {

    render(){
        
    return (
       
        <div className={classes.profile_container}>
            {(this.props.state.showModal===true && this.props.state.post!==null)?
            <Modal show={this.props.state.showModal} closeModal={()=>this.props.showModalHandler(null)}>
                <Post key={this.props.state.post.id} image={`${this.props.state.post.photo}`} 
                    profilePic={`${this.props.state.post.user.profilepic}`}
                    userName={this.props.state.post.user.username} comments={this.props.state.post.comments} 
                    num_likes={this.props.state.post.likes.length}
                    date={this.props.state.post.created_at} liked={()=>this.likedHandler(this.props.state.post.id)}
                    showComments={this.props.state.showComments} 
                    showCommentHandler={this.showCommentsHandler}
                    post_id={this.props.state.post.id}/>
            </Modal>:
            null}
            <h1 className={classes.heading}>Profile</h1>
            <div className={classes.profile_details}>
                <div className={classes.profile_pic}>
                        <img 
                        // src={`${this.state.user.userDp}`}
                        src={this.props.getLoggedIn===true?
                            `http://localhost:8000${this.props.state.user.userDp}`:`${this.props.state.user.userDp}`
                        }
                        className={classes.img_dp}/>
                </div>
                <div className={classes.profile_info}>
                    <div className={classes.name_update_container}>
                        <div className={classes.username}>{this.props.state.user.username}</div>
                        {
                        this.props.getLoggedIn===true?
                        <div className={classes.buttons}>
                            <div><Link to='/edit-profile' className={classes.btn_editprofile}>Edit Profile</Link></div>
                            <div><Link to='/logout' className={classes.btn_logout}>Logout</Link></div>
                        </div>:
                        <div className={classes.buttons} style={{display:"flex",justifyContent:"center"}}>
                        <div><Link to='/' className={classes.btn_editprofile}>Follow</Link></div>
                        </div>}
                    </div>
                    <div className={classes.social_details}>
                        <div className={classes.total_posts}>{this.props.state.posts?this.props.state.posts.length:0} posts</div>
                        <div className={classes.total_followers}>{this.props.state.followers?this.props.state.followers:0} followers</div>
                    </div>
                    {   this.props.getLoggedIn===true?
                        this.props.state.user.userBio?
                        <div className={classes.bio}>
                            Bio - {this.props.state.user.userBio}
                        </div>
                    :
                        <div className={classes.bio} style={{fontSize:"20px"}}>
                            Complete your profile by adding bio
                        </div>
                    :
                        this.props.state.user.userBio?
                        <div className={classes.bio}>
                            Bio - {this.props.state.user.userBio}
                        </div>
                   :null
                    }
                </div>
            </div>
            <h1 className={classes.heading}>Posts</h1>
            {  this.props.getLoggedIn===true
                ? <Link to='/upload-post' className={classes.addPost}>Add post +</Link>:null}
            <div className={classes.posts}>
                {this.props.state.posts?this.props.state.posts.map(post=>{
                    return (
                        <div className={classes.post} key={post.id} onClick={()=>this.props.showModalHandler(post.id)}>
                            <img 
                                src={`http://localhost:8000${post.photo}`} 
                            className={classes.img}/>
                        </div>
                    )
                }):null}
            </div>
           
        </div>
    )
    
    }
}

const mapStateToProps=(state)=>{

    return {
        userKey:state.auth.userKey,
        userId:state.auth.userId
    }

}



export default connect(mapStateToProps,null)(Profile);
