import {combineReducers} from 'redux';
import { userReducer } from './userReducer';
import {productReducer} from './productReducer';

const reducers = combineReducers({
    foods:productReducer,
    user:userReducer
})
export default reducers;