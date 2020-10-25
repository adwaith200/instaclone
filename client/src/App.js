import React, { Component } from 'react';
import './components/FontAwesomeIcons/Icons'
import axios from './axios';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import SignUp from "./containers/Auth/signUp/SignUp";
import Home from './containers/Home/Home';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Explore from './containers/Explore/Explore';
import Profile from './containers/Profile/Profile';
import updateProfile from './containers/Profile/updateProfile/updateProfile';
import * as actions from './store/actions/indexActions';
import UploadPost from './containers/Profile/updateProfile/uploadPosts/UploadPosts';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  async componentDidMount(){
    if(localStorage.getItem('token')){
        this.props.onSubmitAuth(localStorage.getItem('token'));
    }
  }

  render() {
    let routes=(
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/Signup' component={SignUp} /> 
        <Redirect to='/login'/>         
      </Switch>
    );
    if(this.props.userKey){
      routes=(
        <Switch>
          <Route path='/login'  component={Login} />  
          <Route path='/' exact component={Home} />
          <Route path='/explore'  component={Explore} />
          <Route path='/profile'  component={Profile} />
          <Route path='/edit-profile' component={updateProfile} />
          <Route path='/upload-post' component={UploadPost} /> 
          <Route path='/logout' component={Logout} /> 
          <Redirect to='/' />
        </Switch> 
        )
      }
    

    return (
      <div>
        <Layout>    
          {routes}    
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return {
      userKey:state.auth.userKey
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onSubmitAuth:(key)=>dispatch(actions.authSucess(key))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
