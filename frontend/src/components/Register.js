import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    role: 'buyer',
  });
  const [err,setErr]=useState()
  const navigate = useNavigate();

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.password2) {
      console.error('Passwords do not match');
    } else {
          axios.post('http://localhost:5000/api/auth/register',user).then((res)=>{
            if(res.data.msg=="Registeration done"){
                navigate("/login")
            }
            else{
              setErr(res.data.msg)
            }
          }).catch((er)=>{
            console.log(er)
          })
    }
  };

  return (
    <div className="form-container">
      <h1>Account Register</h1>{err!=undefined&&err}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" value={user.firstName} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" value={user.lastName} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={user.email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" name="phone" value={user.phone} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={user.password2} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" value={user.role} onChange={onChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Register;
