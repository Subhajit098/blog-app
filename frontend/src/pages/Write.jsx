import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
export default function Write() {
  const navigate = useNavigate()
  const state = useLocation().state
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "");

  const [file, setFile] = useState(null);

  // const handleChange=(e)=>{
  //   setData({...prev,[e.target.name]:[e.target.value]})
  // }
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:3000/api/upload", formData);
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload();

    try {
      state ? await axios.put(`http://localhost:3000/api/posts/${state.id}`,
      {withCredentials: true, credentials: 'include'}, {
        title, desc: value, cat, img: file ? imgUrl : ""
      }) : await axios.post(`http://localhost:3000/api/posts/`,{withCredentials: true, credentials: 'include'}, {
        title, desc: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate("/");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type='text' name='title' placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className='editorContainer'>
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type="file" style={{ display: "none" }} name="file" onChange={e => setFile(e.target.files[0])} id='file' />
          <label className='file' htmlFor='file' style={{ cursor: "pointer" }}>Upload Image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'><input type='radio' name='cat' value="art" id='art' onChange={e => setCat(e.target.value)} checked={cat === "art"} />
            <label htmlFor='art'>Art</label>
          </div>

          <div className='cat'><input type='radio' name='cat' value="science" id='science' onChange={e => setCat(e.target.value)} checked={cat === "science"} />
            <label htmlFor='science'>Science</label>
          </div>

          <div className='cat'><input type='radio' name='cat' value="technology" id='technology' onChange={e => setCat(e.target.value)} checked={cat === "technology"} />
            <label htmlFor='technology'>Technology</label>
          </div>

          <div className='cat'><input type='radio' name='cat' value="cinema" id='cinema' onChange={e => setCat(e.target.value)} checked={cat === "cinema"} />
            <label htmlFor='cinema'>cinema</label>
          </div>

          <div className='cat'><input type='radio' name='cat' value="design" id='design' onChange={e => setCat(e.target.value)} checked={cat === "design"} />
            <label htmlFor='design'>design</label>
          </div>

          <div className='cat'><input type='radio' name='cat' value="food" id='food' onChange={e => setCat(e.target.value)} checked={cat === "food"} />
            <label htmlFor='food'>food</label>
          </div>
        </div>
      </div>
    </div>
  )
}
