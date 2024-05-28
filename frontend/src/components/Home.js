import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Gc from '../Gc';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let [data,setData]=useState([])
    let [f,setF]=useState(true)
    let obj=useContext(Gc)
    let navigate=useNavigate()
    let fun=(item)=>{
      if(obj.logininfo.token==""){
        navigate('/login')
      }else{
        if((item.likes).indexOf(obj.logininfo._id==-1)){
          axios.post(`http://localhost:5000/api/properties/like/${item._id}`,{"id":obj.logininfo._id}).then((res)=>{
          axios.get('http://localhost:5000/api/properties').then((res)=>{
            setData(res.data)
          })
        })
      }
      setF(false)

      }
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/properties').then((res)=>{
            setData(res.data)
        })
    },[])
  return (
    <div>
      <h1>Welcome to Rentify</h1>
      <p>Your platform for finding and renting properties easily.</p>
      <div className='properties'>
      {
        data.map((item,ind)=>{
            return(<div className='property' key={ind}>
                <div className='left'>
                    <h1>title:{item.title}</h1>
                    <p>location:{item.location}</p>
                    <p>area:{item.area}</p>
                    <p>bedrooms:{item.bedrooms}</p>
                    <p>bathrooms:{item.bathrooms}</p>
                    <b>Rent:{item.rent}/month</b>
                    <p>amenities:{item.amenities}</p>
                </div>
                <div className='right'>
                    <p>likes:{(item.likes).length}</p>
                    <p onClick={()=>fun(item)}>like this property</p> 
                </div>
                <div style={f?{"display":"none"}:{"display":"block"}}>
                  <p>seller name:{item.sellername}</p>
                  <p>seller phno:{item.sellerphone}</p>
                </div>
            </div>)
        })
      }
      </div>
    </div>
  );
};

export default Home;