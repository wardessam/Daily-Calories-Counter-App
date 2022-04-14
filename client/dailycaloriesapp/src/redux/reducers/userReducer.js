import { ActionTypes } from "../action-types";

const initialState ={
  
}
export const userReducer =(state=initialState,action)=>{
   switch (action.type) {
       case ActionTypes.GET_USER:
           return {
               ...state,
               user: action.payload
             }
       case ActionTypes.SET_USER:
         return{
          ...state,
          user: action.payload
         }
        case ActionTypes.SET_DAILY_CALORIES:
          return {
              ...state,
              user:action.payload
           }
       default:
           return state;
   }
}