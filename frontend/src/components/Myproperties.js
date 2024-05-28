import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Gc from '../Gc'
import { useNavigate } from 'react-router-dom'

const Myproperties = () => {
  let [data,setData]=useState([])
  let obj=useContext(Gc)
  let navigate=useNavigate()
  let getit=()=>{
    let sid={id:obj.logininfo._id}
    axios.post("http://localhost:5000/api/properties/my-properties",sid).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getit();
    
  },[])
let del=(id)=>{
  axios.delete(`http://localhost:5000/api/properties/del/${id}`).then((res)=>{
    if(res.data.msg!=undefined){
      getit();
    }
  }).catch((err)=>{
    console.log(err)
  })
}

let upt=(item)=>{
  obj.fun({...obj.logininfo,"item":item})
        navigate("/update")
}

  return (
    <div className='properties'>
      {
        data.map((item)=>{
            return(<div className='property'>
                <div className='left'>
                    <h1>title:{item.title}</h1>
                    <p>location:{item.location}</p>
                    <p>area:{item.area}</p>
                    <p>bedrooms:{item.bedrooms}</p>
                    <p>bathrooms:{item.bathrooms}</p>
                    <b>Rent:{item.rent}/month</b>
                    <p>amenities:{item.amenities}</p>
                    <button onClick={()=>upt(item)}>update</button>
                    <button onClick={()=>del(item._id)}>delete</button>
                </div>
            </div>)
        })
      }
      </div>
  )
}

export default Myproperties