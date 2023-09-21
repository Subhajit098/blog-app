const express=require("express");
const cors=require("cors");
const authRoutes =require("./routes/auth.js");
const userRoutes =require("./routes/user.js");
const postRoutes =require("./routes/posts.js");
const cookieParser=require("cookie-parser");
const multer=require("multer");

const app=express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser()); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);

app.listen(3000,()=>{
    console.log("Server is connected to port 3000");
})