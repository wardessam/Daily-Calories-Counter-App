import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/userActions';
import {connect} from 'react-redux'

const Login = (props) => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();
  function ValidateEmail(mail) 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
   return (true)
 }
   alert("You have entered an invalid email address!")
   return (false)
}
const handleLogin=(e)=>{
  e.preventDefault();
  if(ValidateEmail(email)){
    var promise = props.login({'email': email, 'password': password })
    promise.then(user=>{
      if(user){
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userdailyCals",user.dailycalories_needed);
        localStorage.setItem("userRemCals", user.dailycalories_remaining);
        localStorage.setItem("date",user.dateoftoday);
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        if(user.dateoftoday==null||user.dateoftoday!=date){
          navigate('/dailyCals');
        }
       else{
        navigate('/home');
        }
      }
      else{
        alert("Wrong Email or Password");
      }
    })
   
    
 
  }
}
useEffect(()=>{
  if(email&&password){
  
  }
},[email,password])

    return ( 
      <div className='container'>
    <form className="Form">
      <h2>Daily Calories Counter Application</h2>
      <h3>Login into an existing account</h3>
    <input type="text" placeholder="Email" name="email" 
    required value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" placeholder="Password" name="password" required
    value={password} 
    onChange={(e)=>setPassword(e.target.value)}/>
    <button type="submit" onClick={handleLogin}>Sign In</button><br></br>
    <Link to="/register"><label className="mainlabel">Don't have an account?</label></Link>
   </form>
   </div>
     );
}
const mapStateToProps  = (state) => ({user:state.user})
export default connect(mapStateToProps, {login})(Login);