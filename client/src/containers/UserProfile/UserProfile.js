import React from 'react';
import {connect} from 'react-redux';
import axios from "../../axios";
// import {Link} from 'react-router-dom';
// import Modal from '../../components/UI/Modal/Modal';
// import Post from '../../components/Post/Post';
import Profile from '../Profile/Profile';

class UserProfile extends React.Component {

    state={
        user:{
            userId:null,
            userBio:null,
            username:null,  
            userDp:null,
        },
        posts:null,
        followers:null,
        showModal:false,
        postId:null,
        post:null

    }

    async componentDidMount(){
        //getting the user data
        try{
            const userId=this.props.match.params.userId*1;
            const response=await axios.get(`api/users/${userId}`);
                this.setState({user:{
                    userId:response.data.id,
                    userBio:response.data.bio,
                    username:response.data.username,
                    userDp:response.data.profilepic
                }})

                //getting user posts
                const result=await axios.get(`api/users/${this.state.user.userId}/getprofilepostsandfollowers`);
                const posts=result.data.posts;
                const followers=result.data.followers;

                this.setState({
                            posts,
                            followers      
                })
            }catch(err){
                console.log(err.response);
            }
        
    }
    
    
   
    showModalHandler=async(id)=>{
        if(id){
            const response=await axios.get(`api/posts/${id}`);
            this.setState({...this.state,showModal:!this.state.showModal,post:response.data});
        }
        else {
            this.setState({...this.state,showModal:!this.state.showModal})
        }
    }

    render(){
        console.log("UserProfile")
        
    return (
        <Profile state={this.state} showModalHandler={this.showModalHandler}/>
    )
    }
}

const mapStateToProps=(state)=>{

    return {
        userKey:state.auth.userKey,
        userId:state.auth.userId
    }

}



export default connect(mapStateToProps,null)(UserProfile);
