import { ActionTypes } from "../action-types";

const initialState ={
 foods:[]
}
export const productReducer =(state=initialState,action)=>{
   switch (action.type) {
       case ActionTypes.GET_ALL_PRODUCTS:
           return {
               ...state,
               foods:action.payload
             }
      
   
       default: return state;
   }
}