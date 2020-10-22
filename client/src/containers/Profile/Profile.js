import React from 'react';
import classes from './Profile.css';
import {connect} from 'react-redux';
import axios from "../../axios"

class Profile extends React.Component {


    state={
        user:{
            userId:null,
            userBio:null,
            username:null,  
            userDp:null,
        },
        posts:null,
        followers:null

    }

    async componentDidMount(){

        //getting the user data
        try{
            const response=await axios.get('api/users/getloggedinprofile',
                    {
                        headers:{
                            "Authorization":'Token'+' '+this.props.userKey
                    } 
                }
            );
            console.log(response);
            this.setState({user:{
                userId:response.data.user.id,
                userBio:response.data.user.bio,
                username:response.data.user.username,
                userDp:response.data.user.profilepic
            }})

            //getting user posts
            const result=await axios.get(`api/users/${this.state.user.userId}/getprofilepostsandfollowers`);
            console.log(result,"result")
            const posts=result.data.posts;
            const followers=result.data.followers;
            console.log(posts)

            this.setState({
                        posts,
                        followers      
            })

        }catch(err){
            console.log(err.response);
        }
    }


    render(){
    return (
        <div className={classes.profile_container}>
            <h1 className={classes.heading}>My Profile</h1>
            <div className={classes.profile_details}>
                <div className={classes.profile_pic}>
                        <img 
                        src={`http://localhost:8000${this.state.user.userDp}`}
                        className={classes.img_dp}/>
                </div>
                <div className={classes.profile_info}>
                    <div className={classes.name_update_container}>
                        <div className={classes.username}>{this.state.user.username}</div>
                        <button className={classes.btn_editprofile}>Edit Profile</button>
                        <button className={classes.btn_logout}>Logout</button>
                    </div>
                    <div className={classes.social_details}>
                        <div className={classes.total_posts}>{this.state.posts?this.state.posts.length:0} posts</div>
                        <div className={classes.total_followers}>{this.state.followers?this.state.followers:0} followers</div>
                    </div>
                    {this.state.user.userBio?
                    <div className={classes.bio}>
                        Bio - {this.state.user.userBio}
                    </div>
                    :
                     <div className={classes.bio} style={{fontSize:"20px"}}>
                        Complete your profile by adding bio
                    </div>
                    }
                </div>
            </div>
            <h1 className={classes.heading}>Posts</h1>
            <div className={classes.posts}>
                {console.log(this.state.posts)}
                {this.state.posts?this.state.posts.map(post=>{
                    console.log(post,"post")
                    return (
                        <div className={classes.post} key={post.id}>
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
        userKey:state.auth.userKey
    }

}



export default connect(mapStateToProps,null)(Profile);
