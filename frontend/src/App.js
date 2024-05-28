// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gc from './Gc';
import Myproperties from './components/Myproperties';
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Login from './components/Login';
import "./App.css"
import Addprop from './components/Addprop';
import Home from './components/Home';
import Upt from './components/Upt';

const App = () => {
  let [logininfo,setLogin]=useState({"token":"","firstName":"","lastName":"","role":"","email":"","phone":""})
  let fun=(obj)=>{
    setLogin(obj)
  }
  let obj={"logininfo":logininfo,"fun":fun}
  return (<BrowserRouter>
              <Gc.Provider value={obj}>
              <div className="App">
              <Navbar/>
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/myproperties" element={<Myproperties/>} />
                  <Route path="/addproperty" element={<Addprop/>}/>
                  <Route path="/update" element={<Upt/>}/>
                </Routes>
              </div>
            </div>
            </Gc.Provider>
          </BrowserRouter>
      
  );
};

export default App;
