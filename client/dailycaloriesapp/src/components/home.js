import Avatar from './avatar.png';
import {connect} from 'react-redux'
import {getFoods} from '../redux/actions/foodActions';
import { updateCals} from '../redux/actions/userActions';
import React, { useEffect, useState } from 'react'
const Home=(props)=> {
    const [searchTxt,setSearchTxt]=useState('');
    const [food,setFoods]=useState([]);
    const [searchFlag,setSearchFlag]=useState(false);
    const [filterFlag,setFilterFlag]=useState(false);
    const [sortFlag_low,setSortFlag_low]=useState(false);
    const [sortFlag_high,setSortFlag_high]=useState(false);
    const [changeCalsFlag,setChangCalsFlag]=useState(false);
    const [addFood,setAddFood]=useState([]);
    const [filterTxt,setFilterTxt]=useState('');
    const [dailyCals,setDailyCals]=useState(localStorage.getItem("userdailyCals"));
    const [remCals,setRemCals]=useState(parseInt(localStorage.getItem("userRemCals")));
    let foods =food.map(obj => ({...obj}));
    let searched_arr=[];
    let filtered_arr=[];
    ///First Render
     useEffect(()=>{
        let p=props.getFoods();
        p.then(foods=>{
            setFoods(foods)
            })
        
     },[])

     //Searching
     useEffect(()=>{
      searched_arr = foods.filter(f=>f.name.toLowerCase()===searchTxt.toLowerCase());
      setFoods(searched_arr)
     },[searchFlag])

     //Filtration
     useEffect(()=>{
        filtered_arr = foods.filter(f=>f.calories===filterTxt);
        setFoods(filtered_arr)
       },[filterFlag])
       
       //Lowest Sorting
       useEffect(()=>{
        filtered_arr = foods.sort(function (f1, f2) {
            return f1.calories - f2.calories;
          });
        setFoods(filtered_arr)
       },[sortFlag_low])

       //Highest Sorting
       useEffect(()=>{
        filtered_arr = foods.sort(function (f1, f2) {
            return  f2.calories - f1.calories ;
          });
        setFoods(filtered_arr)
       },[sortFlag_high])
       
       //Changing Cals Count
       useEffect(()=>{
        let addCals = parseInt(addFood.calories);
        console.log(addFood)
        if(remCals<addCals){
            alert("Can't Add Item, It exeeds the limit of your remaining calories!");
        }
        else{
             var res =remCals-addCals;
             if(res){
              setRemCals(res);
              setAddFood([]);
              ////
              const current = new Date();
              const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
              var promise = props.updateCals({'email': localStorage.getItem('userEmail'),'neededcalories':dailyCals, 'remainingcalories':res,'Date':date })
              promise.then(user=>{
                console.log("promise",user);
                if(user){
                 localStorage.setItem("userdailyCals", dailyCals);
                 localStorage.setItem("userRemCals", remCals);
                 localStorage.setItem("date", date);
                }
                else{
                    alert("Can't Add Your Daily Calories Now, Please Try Again Later!")
                }
            })
           
        
             }
           
        }
       },[addFood])

    ////Searching
    const searchFood =(e)=>{
        e.preventDefault();
        console.log(searchTxt);
        if(searchTxt){
           setSearchFlag(true);
         }
         else{
             alert("Please Type name of food you want to search for");
         }
    }
    /////Filtring
    const filterfood=(e)=>{
        e.preventDefault();
        if(!isNaN(filterTxt)){
             setFilterFlag(true);
        }
        else{
            alert("Please Type a valid numeric value")
        }
   }
   ////Sorting
  const sortFood=(e)=>{
     e.preventDefault();
     let value =e.target.value;
     if(value==="high"&&sortFlag_high==false){
        setSortFlag_high(true);
     }
     else if(value==="high"&&sortFlag_high==true){
        setSortFlag_high(false);
     }
     else if(value==="low"&&sortFlag_low==false){
        setSortFlag_low(true);
     }
     else if(value==="low"&&sortFlag_low==true){
        setSortFlag_low(false);
     }
  }
  //Update Calories
  const updateCals =(e,food)=>{
      e.preventDefault();
      setChangCalsFlag(true);
      setAddFood(food);
     
  }
    return(
      <div>
           <h2>Daily Calories Counter Application</h2>
           <form className="searchForm">
                 <input type="text" placeholder="Search.." name="search" value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)}/>
                <button className='search' type="submit" onClick={searchFood}>Search </button>
            </form>
            <div className="homeContainer">
                  <div className="calories">
                      <h3>Goal</h3>
                      <div className="totalCalories">
                              <p> Total needed Calories:</p>
                               <h3>{dailyCals} Cals</h3>
                      </div>
                      <div className="remainingCalories">
                             <p> Total rem Calories:</p>
                             <h3>{remCals} Cals</h3>
                      </div>
                  </div>
                  <div className="foodList">
                  
                      
                          <h3 className="title">Food Items</h3>
                          
                          <form className="filterForm">
                          <input type="text" placeholder="Calories Amount" name="search" 
                          value={filterTxt}
                          onChange={(e)=>setFilterTxt(e.target.value)}/>
                          <button className='filter' type="submit" onClick={filterfood}>Filter </button>
                          </form>
                          
                          
                          <h3>Sort: 
                              <br/>
                             <select onChange={sortFood}>
                             <option value="" disabled>Select</option>
                                <option value="high">Highest Calories</option>
                                <option value="low">Lowest Calories</option>
                             </select>
                          </h3>
                          
                        
                         
                      

                {food.map(food=> 
                
                  <div className="foodItem" key={food.id}>
                      <img className='foodImg' src={food.picture} />
                      <div className="afterPhoto">
                      <div className="itemData">
                          <div><b>{food.name}</b></div>
                          <div>{food.calories} Cals</div>
                      </div>
                      <button onClick={(e)=>updateCals(e,food)}>Add Item</button>
                      </div>
                  </div>
                 
                  )}
               
                
                  
                  
                  </div>
            </div>
            
        </div>
     )
}

const mapStateToProps  = (state) => ({foods:state.foods})
export default connect(mapStateToProps, {getFoods,updateCals})(Home)