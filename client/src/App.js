import React, { Component } from 'react';
import './components/FontAwesomeIcons/Icons'
import axios from './axios';
import Layout from './hoc/Layout/Layout';
import SignUp from './containers/Auth/signUp/SignUp';


class App extends Component {


  async componentDidMount(){
    try{

      const response=await axios('posts/');
      console.log(response.data);

    }catch(err){
      console.log(err);
    }
  }
 

  render() {
    return (
      <div className="App">
        <Layout>
          <SignUp />
          {/* main */}
        </Layout>
      </div>
    );
  }
}

export default App;
