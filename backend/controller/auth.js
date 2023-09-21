const db = require("../database/db.js");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
require("dotenv").config();

// register controller

const register = (req, res) => {
    // check existing user
    const q = "SELECT * FROM user WHERE email= ? OR username= ?";

    db.query(q, [req.body.email, req.body.username], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        };

        // User already exists
        if (result.length) return res.status(409).json("User already exists");

        // let hashed_pw=JSON.stringify(req.body.password);
        let hashed_pw=req.body.password;
        console.log(hashed_pw);

        // Register the user with the new password
        // const salt =   bcrypt.genSaltSync(10);
        // const hashed =  await bcrypt.hash(hashed_pw, salt);
        // console.log(salt);
        // console.log(hashed);

        const q2 = "INSERT INTO user(`username`,`email`,`password`) VALUES(?)";

        console.log("Hello");

        const values = [req.body.username, req.body.email, hashed_pw];

        db.query(q2, [values], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json("User has been created.")
        });

    });
};


//  LOGIN handler
const login = (req, res) => { 
    // CHECK IF USER EXISTS OR NOT
    const q="SELECT * FROM user WHERE username= ?";

    db.query(q,[req.body.username],async(err,data)=>{
        if(err) return res.status(500).json(err);

        if(data.length===0) return res.status(404).json("User not found");


        // ELSE CHECK PASSWORD
        // const checkPassword = await bcrypt.compare(req.body.password,data[0].password)
        // console.log(checkPassword);

        const comparePassword=(saved,given)=>{
            let bool;
            if(saved===given) bool=true;
            else bool=false;
            return bool
        }
  
        if(!comparePassword(req.body.password,data[0].password)) {
            // console.log(data[0].password);
            return res.status(400).json("Wrong Username or Password");
        }

        const token=jwt.sign({id:data[0].id },"jwtkey");

        const {password,...other}=data[0];

        res.cookie("access_token",token,{
            httpOnly:false
        }).status(200).json(other);
    });
}

const logout = (req, res) => {
res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
}).status(200).json("User has been logged out successfully");
}

module.exports = {
    register, login, logout
};