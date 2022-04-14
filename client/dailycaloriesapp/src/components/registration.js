import { useState} from 'react';
import {Link} from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Registration = (props) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    const navigate = useNavigate();
//Validate Email
function ValidateEmail(mail) 
   {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
//Validate Password
function checkPassword(password) 
{ 
var passStrength=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
if(password.match(passStrength)) 
 return true;
else
 return false;
}  
const handleRegistration=(e)=>{
    e.preventDefault();
    //Check Email
if(ValidateEmail(email)){
    //Check Password
if(checkPassword(password)){
 //Check password and confirm password are matched
  if(password===cpassword){
    //Do the registration
   let promise = props.register({'email': email,'name':name, 'password': password })
   promise.then(user=>{
       if(user){
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userdailyCals",user.dailycalories_needed);
        localStorage.setItem("userRemCals", user.dailycalories_remaining);
        localStorage.setItem("date",user.dateoftoday);
        alert("Registered Successfully");
        navigate('/dailyCals');
       }
       else{
        alert("Can't Register Now");
       }
   })
    //console.log(localStorage.getItem("userEmail"));
   
  }
  else{
      alert("Passwords doesn't match");
  }
}

else{
    alert("Passwords should be more than 6 characters");
}
}
}
    return ( 
        <div className='container'>
    <form className="Form" onSubmit={handleRegistration}>
        <h2>Daily Calories Counter Application</h2>
        <h3>Create New Account</h3>
      <input type="text" placeholder="Full Name" name="name" required autoFocus value={name} onChange={(e)=>setName(e.target.value)} />
      <input type="text" placeholder="E-mail" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" name="password" required 
      value={password} 
      onChange={(e)=>setPassword(e.target.value)}
      />
      {password ?
      <div className='progress'>
      <span className='passmsg'> Password should have at least 1 special character, 1 upper case, 1 lower case, 1 number</span>
      </div>:null}
      
      <input type="password" placeholder="Confirm Password" name="cpassword" required
      value={cpassword} 
      onChange={(e)=>setCpassword(e.target.value)}/>
      <button type="submit" >Sign Up</button><br></br>
      <Link to="/"><label className="mainlabel">Already have an account?</label></Link>
     </form>
     </div>
     );
}
 
const mapStateToProps  = (state) => ({user:state.user})
export default connect(mapStateToProps, {register})(Registration);