import React, { useContext, useState } from 'react'
import Gc from '../Gc';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addprop = () => {
    let obj=useContext(Gc)
    let navigate=useNavigate()
    let [property, setProperty] = useState({
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
    
    const onSubmit = (e) => {
        e.preventDefault();
        property={...property,"sellerid":obj.logininfo._id,"sellername":obj.logininfo.firstName,"sellerphone":obj.logininfo.phone}
        axios.post('http://localhost:5000/api/properties/',property).then((res)=>{
        if(res.data!='Server error'){
            navigate('/myproperties')}
        }).catch((err)=>{
            console.log(err)
        })
      };

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
        <input type="submit" value="add" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Addprop