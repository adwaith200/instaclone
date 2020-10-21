import React, { Component } from 'react';
import './components/FontAwesomeIcons/Icons'
import axios from './axios';
import Layout from './hoc/Layout/Layout';
import SignUp from "./containers/Auth/Signup/Signup";
import Login from './containers/Auth/Login/Login';
import Home from './containers/Home/Home';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Explore from './containers/Explore/Explore';


class App extends Component {
  render() {
    let routes=(
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/Signup' component={SignUp} /> 
        <Redirect to='/login'/>         
      </Switch>
    );
    if(this.props.userKey){
      console.log("heroku");
      routes=(
        <Switch>
          <Route path='/login'  component={Login} />  
          <Route path='/' exact component={Home} />
          <Route path='/explore' exact component={Explore} />
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
  console.log(state,"dakshina")
    return {
      userKey:state.auth.userKey
    }
}



export default connect(mapStateToProps,null)(App);
