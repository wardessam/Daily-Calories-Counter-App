import { useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateCals} from '../redux/actions/userActions';
import {connect} from 'react-redux'
const DailyCalories = (props) => {
    const [dailyCals,setDailyCals]=useState('');
    const navigate = useNavigate();
    const checkCalsisNum=(dailyCals)=>{
        if(isNaN(dailyCals)){
            alert("Please add a numeric value");
            return false;
        }
        else{
            return true;
        }
    }
    const movetoHome=(e)=>{
        e.preventDefault();
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
        if(checkCalsisNum(dailyCals)&&dailyCals!==""){
            var promise = props.updateCals({'email': localStorage.getItem('userEmail'),'neededcalories':dailyCals, 'remainingcalories':dailyCals,'Date':date })
            promise.then(user=>{
                console.log("promise",user);
                if(user){
                 localStorage.setItem("userdailyCals", dailyCals);
                 localStorage.setItem("userRemCals", dailyCals);
                 localStorage.setItem("date", date);
                  navigate('/home');
                }
                else{
                    alert("Can't Add Your Daily Calories Now, Please Try Again Later!")
                }
            })
           
        }
    }
    return ( 
        <div className='container'>
        <form id="dailyCal" className='Form'>
          <h2>Daily Calories Counter Application</h2>
          <h3>Set Your Goal</h3>
        <input type="text" placeholder="Calories needed/ day" name="cals" 
        required value={dailyCals} onChange={(e)=>setDailyCals(e.target.value)}/>
        <button type="submit" onClick={movetoHome}>Finish</button>
       </form>
       </div>
     );
}
 
const mapStateToProps  = (state) => ({user:state.user})
export default connect(mapStateToProps, {updateCals})(DailyCalories);