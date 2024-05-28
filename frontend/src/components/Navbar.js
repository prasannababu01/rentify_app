// src/components/layout/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Gc from '../Gc';

const Navbar = () => {
  let obj=useContext(Gc)
  let navigate=useNavigate()

  const onLogout = () => {
    obj.fun({"token":"","firstName":"","lastName":"","role":"","email":"","phone":""})
    navigate('/')
  };


  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">Rentify</Link>
      </h1>
      <ul>
      {obj.logininfo.token==""&&
      <li>
        <Link to="/login">Login</Link>
        
      </li>}
      {obj.logininfo.token==""&&
        <li>
        <Link to="/register">Register</Link>
      </li>}
      {
        obj.logininfo.token!=""&&
        <li>Hello {obj.logininfo.firstName}</li>
      }
      {
        obj.logininfo.role=="seller"&&
        <li>
          <Link to="/myproperties">Myproperties</Link>
        </li>
      }
      {
        obj.logininfo.role=="seller"&&
        <li>
          <Link to="/addproperty">Add property</Link>
        </li>
      }
      {
        obj.logininfo.token!=""&&
        <li onClick={onLogout}>
          Logout
        </li>
      }
      </ul>
    </div>
  );
};

export default Navbar;
