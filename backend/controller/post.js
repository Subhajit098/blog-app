const db=require("../database/db.js");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const getPosts=(req,res)=>{
    
    // reaching the category title
    // query is everything after the ? mark
    const q=req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })

}
const getPost=(req,res)=>{
    const q="SELECT p.id, `username`,`title`,`desc`,p.img,u.img AS userImg,`cat`,`date` FROM user as u JOIN posts as p ON u.id=p.uid where p.id=?"; 

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}

const addPost=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).json("not authenticated");
    }

    jwt.verify(token,process.env.JWTKEY,(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");

        const q="INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)";

        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.json("Post has been created");
        })
    })
}

const deletePost=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).json("not authenticated");
    }

    jwt.verify(token,process.env.JWTKEY,(err,userInfo)=>{
        if(err) return res.status(403).json("token is not valid");
        const postId=req.params.id
        const q="DELETE FROM posts WHERE `id`=? AND `uid`=?";
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("Your can delete only your post");

            return res.json("Post has been deleted!");
        })
    })
}

const updatePost=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).json("not authenticated");
    }

    jwt.verify(token,process.env.JWTKEY,(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");

        const q="UPDATE posts SET `title`=?,`desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
        const postID= req.params.id;
        const values=[
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ]

        db.query(q,[...values,postID,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.json("Post has been updated");
        })
    })
}


module.exports={addPost,updatePost,deletePost,getPost,getPosts}; 