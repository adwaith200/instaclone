import React, { Component } from 'react';
import './components/FontAwesomeIcons/Icons'
import axios from './axios';
import Layout from './hoc/Layout/Layout';
import SignUp from "./containers/Auth/Signup/Signup";
import Login from "./containers/Auth/Login/Login";
import Home from './containers/Home/Home';
import {Route} from 'react-router-dom'


class App extends Component {


  // async componentDidMount(){
  //   try{

  //     const response=await axios('api/posts/');
  //     console.log(response.data);

  //   }catch(err){
  //     console.log(err);
  //   }
  // }
 

  render() {
    return (
      <div>
        <Layout>
          <SignUp />
          <Route path='/home' exact component={Home} />
        </Layout>
      </div>
    );
  }
}

export default App;
