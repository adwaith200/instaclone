import React, { PureComponent } from 'react'
import classes from './Layout.css';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import {connect} from 'react-redux';
import axios from "../../axios";
import Modal from "../../components/UI/Modal/Modal";
import User from '../../components/UserSearch/User'

class Layout extends PureComponent {

    state={
        profilePic:null,
        search:false,
        show:false,
        users:null

    }

    closeModal=()=>{
        this.setState({show:!this.state.show})
    }
    

    setProfilePic=async(userId)=>{
        try{
                    if(userId){
                        const response=await axios.get(`api/users/${userId}`);
                        this.setState({
                            profilePic:response.data.profilepic});
                    }
                }catch(err){
                    console.log(err.response);
                }
        }

        searchChangeHandler=async(e)=>{
            if(e.key==='Enter')
           {    
               const response=await axios.get(`api/users?search=${e.target.value}`);
               this.setState({search:true,users:response.data,show:true});
           }
           
        }

    render() {
        if(this.props.userId)
        {
            this.setProfilePic(this.props.userId);
        }
        return (
            <div >
                <header>
                    <NavigationItems userId={this.props.userId} 
                    userKey={this.props.userKey} 
                    image={this.state.profilePic}
                    searchChangeHandler={this.searchChangeHandler}/>
                </header>
                {this.state.search===true?<Modal show={this.state.show} closeModal={this.closeModal}>
                    {this.state.users.map(user=>{
                        return <User user={user}  closeModal={this.closeModal}/>
                    })}
                </Modal>:null}
                <main>
                    {this.props.children}
                </main>
            </div>
    
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userId:state.auth.userId,
        userKey:state.auth.userKey
    }
}

export default connect(mapStateToProps,null)(Layout);