import React, { PureComponent } from 'react';
import classes from './Login.css';
import axios from '../../../axios';
import {Redirect} from 'react-router-dom';


class Login extends PureComponent {

    state={
        credentials:{
                username:null,
                password:null,
        },
        userId:null
      }
      
      inputChangedHandler=(e,id)=>{
        let credentials={...this.state.credentials};
    
        if(id==="username"){
          credentials.username=e.target.value;
        }
        else {
          credentials.password=e.target.value;
        }
        console.log(credentials,"anagha")
        this.setState({credentials})
      }
    
      onSubmitHandler=async(e)=>{
        e.preventDefault();
        try{
          const credentials={
            ...this.state.credentials
          }
          const response=await axios.post('auth/login/',credentials);
          console.log(response,"anagha");
          this.setState({userId:response.data})
          localStorage.setItem('token',response.data.key);
        //  this.props.history.push('/home')
        }catch(err){
          console.log(err.response)
        }
      }
    
    render() {

        let component=(
            <div className={classes.container}>
                <form id="form" className={classes.form} onSubmit={this.onSubmitHandler}>
                <h2>Login</h2>
                <div className={classes.form_control}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter username"
                onChange={(event)=>this.inputChangedHandler(event,"username")}
                defaultValue=""/>
                <small>Error message</small>
                </div>
                <div className={classes.form_control}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" defaultValue=""
                onChange={(event)=>this.inputChangedHandler(event,"password")}/>
                <small>Error message</small>
                </div>
                <button type="submit">Submit</button>
          </form>
            </div>
        );

        if(this.state.userId)
            component=<Redirect to='/home' />

        return (
            <div>
                {component}
            </div>
        )
    }
}

export default Login