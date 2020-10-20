import React, { PureComponent } from 'react';
import Post from '../../components/Post/Post';
import axios from '../../axios';

class Home extends PureComponent {

    state={
        posts:null
    }

    async componentDidMount(){
        try{
            console.log('Token'+' '+localStorage.getItem('token'),"anagha")
            const response=await axios.get('api/posts/userfollowingposts',
            {
                    headers:{
                        "Authorization":'Token'+' '+localStorage.getItem('token')
                }
            });
            console.log(response);
            this.setState({posts:response.data.data})

        }catch(err){
            console.log(err.msg)
        }
    }

    render() {
        let posts=null;
        console.log("posts")
        if(this.state.posts!==null){
            posts=this.state.posts.map(post=>{
                return <Post key={post.id} image={`http://localhost:8000${post.photo}`} profilePic={`http://localhost:8000${post.user.profilepic}`}
                userName={post.user.username} comments={post.comments.length} num_likes={post.likes.length}
                date={post.created_at}/>
            })
        }
        return (
            <div>
                {posts}
            </div>
        )
    }
}

export default Home