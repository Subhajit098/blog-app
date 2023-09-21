import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Delete from "../images/trash.png";
import Pencil from "../images/pencil.png";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import MyImg from "../images/MyImg.jpg"
import Menu from '../components/Menu';
import moment from "moment";
import {AuthContext} from "../context/authContext";

export default function Single() {

  const [post,setPost]=useState({});
  const location = useLocation();
  const postId=location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate();
  
  // console.log(cat);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res= await axios.get(`http://localhost:3000/api/posts/${postId}`);
        setPost(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[postId])

  const handleDelete=async (e)=>{
    try{
       axios.delete(`http://localhost:3000/api/posts/${postId}`);
       navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt=""></img>
        <div className='user'>
         {post.userImg ? <img src={post.userImg} alt="user-Image"/> : <p>{post.username}</p>}
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
         {currentUser.username===post.username && <div className='edit'> 
            <Link to={`/write?edit=2`} state={post}>
            <img src={Pencil} alt="edit-icon"/>
            </Link>
            <img src={Delete} onClick={handleDelete} alt="delete-icon"/>
          </div>}
        </div>
        <h1> {post.title} </h1>
        {post.desc}
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}
