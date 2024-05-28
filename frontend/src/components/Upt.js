import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Gc from '../Gc'

const Upt = () => {
    let obj=useContext(Gc)
    let navigate=useNavigate()
    const [property, setProperty] = useState({
        _id:"",
        title: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms:"",
        rent: '',
        amenities:"",
       
      });
    const onChange = (e) =>
        setProperty({ ...property, [e.target.name]: e.target.value });

    useEffect(()=>{
        setProperty(obj.logininfo.item)
    },[])

    let onSubmit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:5000/api/properties/update/${property._id}`,property).then((res)=>{
        if(res.data!='Server error'){
            navigate("/myproperties")
        }
        })
    }
  
    return (
    <div className="form-container">
      <h1>Update property</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={property.title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" value={property.location} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area</label>
          <input type="text" name="area" value={property.area} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="bedrooms">bedrooms</label>
          <input type="text" name="bedrooms" value={property.bedrooms} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="bathrooms">bathrooms</label>
          <input type="text" name="bathrooms" value={property.bathrooms} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rent">Rent</label>
          <input type="text" name="rent" value={property.rent} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input type="text" name="amenities" value={property.amenities} onChange={onChange}  />
        </div>
        <input type="submit" value="update" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Upt