import React, { PureComponent } from 'react';
import Post from '../../components/Post/Post';
import axios from '../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import {Link} from 'react-router-dom';
import classes from './Home.css'

class Home extends PureComponent {

    state={
        posts:null,
        loading:false
    }

    async componentDidMount(){
        try{
            this.setState({loading:true})
            console.log('Token'+' '+localStorage.getItem('token'),"anagha")
            const response=await axios.get('api/posts/userfollowingposts',
            {
                    headers:{
                        "Authorization":'Token'+' '+localStorage.getItem('token')
                }
            }
        );
        this.setState({loading:false})
            this.setState({posts:response.data.data})

        }catch(err){
            console.log(err.msg)
        }
    }

    render() {
        let posts=<Spinner />;
        if(this.state.posts!==null){
            if(this.state.posts.length===0){
               posts=(<div className={classes.no_followers_container}>
                   <p>YOU DON'T FOLLOW ANYONE</p>
                   <div>
                       <Link to='/explore'>EXPLORE!!!</Link> TO FOLLOW PEOPLE
                   </div>
               </div>);
            }
            else {
                    posts=this.state.posts.map(post=>{
                    return <Post key={post.id} image={`http://localhost:8000${post.photo}`} profilePic={`http://localhost:8000${post.user.profilepic}`}
                    userName={post.user.username} comments={post.comments.length} num_likes={post.likes.length}
                    date={post.created_at}/>
                })
            }
        }
        return (
            <div>
                {/* <Spinner /> */}
                {posts}
            </div>
        )
    }
}

export default Home