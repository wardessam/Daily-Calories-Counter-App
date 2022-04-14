import { ActionTypes } from "../action-types"
import axios from 'axios';

//Registration Action
export const register = (data) => async dispatch=>{
  let user = data;
  console.log(user);
  try{
  let response = await axios.post('http://localhost:3000/register', {user}, {'Access-Control-Allow-Credentials':true});
   if (response.data.status==="created") {
      dispatch({
        type: ActionTypes.SET_USER,
        payload: response.data.user
    })
    
    console.log(response)
     return response.data.user;  
  }
  else{
    return false;
  }
  }
  catch(e){
    dispatch( {
      type: "Error",
      payload: console.log(e),
  })
  }

}
//Login Action
export const login = (loginInput) => async dispatch=>{
    let user = loginInput;
    console.log(user);
    try{
    let response = await axios.post('http://localhost:3000/login', {user}, {'Access-Control-Allow-Credentials':true});
     if (response.data.logged_in) {
        dispatch({
          type: ActionTypes.GET_USER,
          payload: response.data.user
      })
      console.log(response)
      return response.data.user;
      }
      else{
        return false;
      }
    }
    catch(e){
      dispatch( {
        type: "Error",
        payload: console.log(e),
    })
    }
  
  }

  //Update Calories
  export const updateCals = (data) => async dispatch => {
    let user = data;
    //console.log(user);
    try{
        const response = await axios.post(`http://localhost:3000/update_calories`,{user},{
            headers: {
                'Content-Type': 'application/json',
            }})
           
        if(response){
        dispatch( {
            type: ActionTypes.SET_DAILY_CALORIES,
            payload: response.data
        })
        //console.log("data",response);
        return response.data;
      }
      else{
        return false
      }
    }
    catch(e){
        dispatch( {
            type: "Error",
            payload: console.log(e),
        })
        return false;
    }

}