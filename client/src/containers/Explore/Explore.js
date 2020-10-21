import React, { PureComponent } from 'react';
import axios from '../../axios';
import Explore_posts from '../../components/Explore_posts/Explore_posts';
import classes from './Explore.css'


class Explore extends PureComponent {

    state={
        posts:[]
    }

    async componentDidMount(){
            try{
                const response=await axios.get('api/posts/');
                console.log(response,"response of explore");
                this.setState({posts:response.data})

            }catch(err){
                    console.log(err.response);
            }
    }
   
    render() {
        let posts;
        if(this.state.posts.length){
            console.log("if")
         posts=(
                this.state.posts.map((post)=>{
                    return <Explore_posts profile_pic={post.user.profilepic} post_img={post.photo} 
                     profile_link={post.user.username}   />
                })
        )
            }
        return (
            <div className={classes.explore_container}>
               {posts}
            </div>
        )
    }
}

export default Explore;