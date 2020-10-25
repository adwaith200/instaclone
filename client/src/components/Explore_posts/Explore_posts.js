import React, { PureComponent } from 'react';
import classes from '../../components/Explore_posts/Explore.css'

class Explore_posts extends PureComponent {
    
    render() {
        return (
                <div className={classes.explore_post}>
                    <div className={classes.profile_link_container}>
                        <div className={classes.profile_pic}>
                            <img src={this.props.profile_pic} 
                            className={classes.pic}/>                         
                        </div>
                        <div className={classes.profile_link}>{this.props.profile_link}</div>
                    </div>
                    <div className={classes.image_container}>
                    <img src={this.props.post_img}
                    className={classes.post} />  
                    </div>              
                </div>
           
        )
    }
}

export default Explore_posts;