import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Menu({cat}) {
    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     }]

const [posts,setPosts]=useState([]);
useEffect(()=>{
  const fetchData = async()=>{
    try{
      const res= await axios.get(`http://localhost:3000/api/posts/?cat=${cat}`);
      setPosts(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  fetchData();
},[cat])

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className='post' key={post.id}>
            <img src="{post.img}" alt=""/>
            <button>Read More</button>
            </div>
        ))}
    </div>
  )
}
