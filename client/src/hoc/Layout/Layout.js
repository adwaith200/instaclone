import React, { PureComponent } from 'react'
import classes from './Layout.css';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import {connect} from 'react-redux';
import axios from "../../axios";

class Layout extends PureComponent {

    state={
        profilePic:null
    }

    

    setProfilePic=async(userId)=>{
        try{
                    if(userId){
                        console.log("Function")
                        const response=await axios.get(`api/users/${userId}`);
                        console.log(response,"layout");
                        this.setState({
                            profilePic:response.data.profilepic});
                    }
                }catch(err){
                    console.log(err.response);
                }
        }


    render() {
        console.log("layout")
        if(this.props.userId)
        {
            this.setProfilePic(this.props.userId);
        }
        console.log(this.state);
        return (
            <div >
                <header>
                    <NavigationItems userId={this.props.userId} 
                    userKey={this.props.userKey} 
                    image={this.state.profilePic}/>
                </header>
                <main>
                    {this.props.children}
                </main>
            </div>
    
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state);
    return {
        userId:state.auth.userId,
        userKey:state.auth.userKey
    }
}

export default connect(mapStateToProps,null)(Layout);