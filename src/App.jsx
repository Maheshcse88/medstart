import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';

import logo from "../src/assets/logo.jpg";

import ListOfHospitals from './assets/components/ListOfHospitals';
import HospitalDetails from './assets/components/HospitalDetails';


function App() {

  return (
   <div>
    <nav className='navbar'>
      <img src={logo} height={40}/>
      <h1>MedStart</h1>
    </nav>
    <Routes>
      <Route path='/' element={<ListOfHospitals/>}/>
      <Route path='/hospital/:id' element={<HospitalDetails/>}/>
   </Routes>
   </div>
   
  )
}

export default App
