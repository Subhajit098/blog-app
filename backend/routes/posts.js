const express=require("express");
const { getPosts, getPost, addPost, deletePost, updatePost } = require("../controller/post.js");


const router=express.Router();
router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",addPost);
router.delete("/:id",deletePost);
router.put("/:id",updatePost);

module.exports = router;