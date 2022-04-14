import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DailyCalories from './components/setDailyCalories';
import Home from './components/home';
import { Provider } from 'react-redux';
import  store  from './redux/store';
const storex = store;
function App() {
  
  return (
    <Provider store={storex}> 
  <Router>
       <Routes>
         <Route exact path = "/" element={<Login/>}/>
         <Route path = "/register"element={<Registration/>}/>
         <Route path = "/dailyCals" element={<DailyCalories/>}/>
         <Route path = "/home" element={<Home/>}/>
       </Routes>
   </Router>
     </Provider>
  );
}

export default App;
