import { ActionTypes } from "../action-types"

import axios from 'axios'

export const getFoods = () => async dispatch => {
    
    try{
        const response = await axios.get(`http://localhost:3000/foods`,{
            headers: {
                'Content-Type': 'application/json',
            }})
        if(response.data){
        dispatch( {
            type: ActionTypes.GET_ALL_PRODUCTS,
            payload: response.data
        })
        return response.data
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
