import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSucess=(userKey)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        userKey
    }
}

export const authInit=(credentials,authType)=>{
    console.log("authInit")
    return async(dispatch)=>{
        dispatch(authStart()); 
        
        if(authType==="login"){
            try{
                const response=await axios.post('auth/login/',credentials);
                console.log(response,"login data");
                localStorage.setItem('token',response.data.key);
                dispatch(authSucess(response.data.key))
            }catch(err){
                console.log(err.response)
            }
        }
        else {
            try{
                const response=await axios.post('auth/registration/',credentials);
                console.log(response,"Signup data");
                localStorage.setItem('token',response.data.key);
                dispatch(authSucess(response.data.key))
              }catch(err){
                console.log(err.response)
              }  
        }

    }
}