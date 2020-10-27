import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSucess=(userKey,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        userKey,
        userId
    }
}

export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authInit=(credentials,authType)=>{
    return async(dispatch)=>{
        dispatch(authStart()); 
        
        if(authType==="login"){
            try{
                const response=await axios.post('auth/login/',credentials);
                localStorage.setItem('token',response.data.key);

                const result=await axios.get('api/users/getloggedinprofile',
                    {
                        headers:{
                            "Authorization":'Token'+' '+response.data.key
                    } 
                }  
            );
            localStorage.setItem('token',response.data.key);
            localStorage.setItem('userId',result.data.user.id);
            dispatch(authSucess(response.data.key,result.data.user.id))

            }catch(err){
                console.log(err.response)
            }
        }
        else {
            try{
                const response=await axios.post('auth/registration/',credentials);
                localStorage.setItem('token',response.data.key);
                dispatch(authSucess(response.data.key))
            }catch(err){
                console.log(err.response)
            }  
        }

    }
}