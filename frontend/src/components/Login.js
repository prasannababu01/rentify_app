import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Gc from "../Gc"
import axios from 'axios';
const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  let obj=useContext(Gc)
  let [err,setErr]=useState()

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.email === '' || user.password === '') {
      console.error('Please fill in all fields');
    } else {
      axios.post('http://localhost:5000/api/auth/login', user).then((res)=>{
        if(res.data.token!=undefined)
          {
          obj.fun(res.data)
          navigate("/")
          }
          else
          {
              setErr(res.data)
          }
        
      })
    }
  };

  return (
    <div className="form-container">
      <h1>Account Login</h1>{err!=undefined&&err}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={user.email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} onChange={onChange} required />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Login;
