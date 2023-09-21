import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
// const axios=require("axios");

export default function Register() {

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:""
  });

  const [err,setError]=useState(null);

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit=async (e)=>{
    try{
     e.preventDefault(); 
     const response=await axios.post("http://localhost:3000/api/auth/register",inputs);
      // console.log(response);
      navigate("/login");
   }
   catch(err){
      console.log(err);
      setError(err.response.data);
   }
  }

  // console.log(inputs);

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username' onChange={handleChange} name='username'/>
        <input required type='email' placeholder='email' onChange={handleChange} name='email'/>
        <input required type='password' placeholder='password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p> }
        <span>Or just login ? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}
