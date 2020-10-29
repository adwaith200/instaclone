import React from 'react';
import classes from './Profile.css';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Post from '../../components/Post/Post';
import axios from '../../axios';
import Follower from '../../components/Followers/Follower';

class Profile extends React.Component {

    state={
        following:false,
        followers:0,
        myFollowers:0,
        seeFollowers:false,
        followersDetails:null
    }

    async componentDidMount(){
        if(this.props.match.path==="/user-profile/:userId"){
            console.log("userProfile");
        try{
            const response=await axios.get(`api/users/${this.props.match.params.userId*1}/getotheruserfollowers`,
            {
                headers:{
                    "Authorization":`Token ${this.props.userKey}`
                }
            });
            console.log(response) ;
             const followers=response.data.map(data=>{
                 console.log(data.follower.id)
                 return data.follower.id
             }) ;

            

             if(followers.includes(this.props.userId))
             {
                 this.setState({following:!this.state.following,followers:followers.length});
             }

            //  this.setState({followers});
        }catch(err){
            console.log(err.message)
        }
      }
      else {
          console.log("profile");

        try{
            const response=await axios.get(`api/users/getfollowers`,
            {
                headers:{
                    "Authorization":`Token ${this.props.userKey}`
                }
            });
            console.log(response) ;
             const followers=response.data.map(data=>{
                 console.log(data.follower.id)
                 return data.follower.id
             }) ;

                 this.setState({followers:followers.length});

            //  this.setState({followers});
        }catch(err){
            console.log(err.message)
        }

      }
  }

  followHandler=async(id)=>{
      if(this.state.following===false){
      try {
          const response=await axios.post(`api/users/${id}/follow/`,{},{
            headers:{
                "Authorization":`Token ${this.props.userKey}`
            }
          });
          console.log(response,"response");
          console.log(this.state.following);
          this.setState({following:!this.state.following,followers:this.state.followers+1});

         
          
      }catch(err){
          console.log(err.message)
      }
    }
    else {
        try {
            const response=await axios.post(`api/users/${id}/unfollow/`,{},{
              headers:{
                  "Authorization":`Token ${this.props.userKey}`
              }
            });
            console.log(response,"response");
            console.log(this.state.following);
            this.setState({following:!this.state.following,followers:this.state.followers-1});
        }catch(err){
            console.log(err.message)
        }
    }
  }

  getFollowers=async()=>{
      if(this.props.match.path==="/user-profile/:userId"){
          const response=await axios.get
          (`api/users/${this.props.match.params.userId*1}/getotheruserfollowers`,{
              
            headers:{
                "Authorization":`Token ${this.props.userKey}`
            }
          })
          console.log(response);
          this.setState({seeFollowers:!this.state.seeFollowers,followersDetails:response.data})

      }
      else {
        const response=await axios.get
        (`api/users/getfollowers`,{
          headers:{
              "Authorization":`Token ${this.props.userKey}`
          }
        })
        console.log(response);
        this.setState({seeFollowers:!this.state.seeFollowers,followersDetails:response.data})

      }
  }

    render(){ 
        console.log("render")       
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
                        <div>
                            <button to='/' className={classes.btn_follow} 
                            onClick={()=>this.followHandler(this.props.match.params.userId*1)}>
                            {this.state.following===true?"UnFollow":"Follow"}
                            </button>
                        </div>
                        </div>}
                    </div>
                    <div className={classes.social_details}>
                        <div className={classes.total_posts}>{this.props.state.posts?this.props.state.posts.length:0} posts</div>
                        <div className={classes.total_followers} onClick={this.getFollowers}>
                         {this.state.seeFollowers===false?this.state.followers?`${this.state.followers} followers`:"0 followers" 
                         :
                        <Modal show>
                             <Follower followers={this.state.followersDetails}/>
                        </Modal>}
                        </div>
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



export default connect(mapStateToProps,null)(withRouter(Profile));
