import React from 'react';
import classes from './Tags.css';
import {withRouter,Link} from 'react-router-dom';

class  Tags extends React.PureComponent {

    state={
        tagname:this.props.location.tagDetails[0].tagname,
        taggedPosts:this.props.location.tagDetails[0].posts,
        username:null
    }

    render(){
        console.log(this.state.tagname);
    return (
        <div className={classes.tag_container}>
            <h1 className={classes.tagname}>#{this.state.tagname}</h1>
            {this.state.taggedPosts.length!==0?
            <div className={classes.tagged_posts}>
                {this.state.taggedPosts.map(post=>{
                    return (
                            <div key={post.id}>
                                <img src={post.photo} />
                            </div>
                        )
                })}
            </div>:
            <p style={{textAlign:"center",padding:"10px"}}>Upload a post in ur account to tag it here <Link to='/upload-post'>Upload post</Link></p>}
        </div>
    )
    }
}

export default withRouter(Tags);
