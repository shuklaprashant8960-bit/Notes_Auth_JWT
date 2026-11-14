const express = require("express")
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express()
app.use(cors());
app.use(express.json())
const users = [];
const notes = [];


app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const existinguser = users.find(user => user.username == username)
    if(existinguser){
        return res.send("Username already exists")
    }
    else{
        users.push({
            username: username,
            password: password
        })
        res.send("you are signed up")
    }
})



app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const currentuser = users.find(user => user.username == username)
    if(!currentuser){
      return res.send("This username does not exist")
    }
   
    if(currentuser.password != password){
         return res.send("Incorrect Password")   
        }

    else{
        const token = jwt.sign({
            username: username,
            
        }, JWT_SECRET);
        res.send({
            message: "You are Signin",
            token 
        })
        
    }
        
    })

    function auth(req, res, next) {
        const token = req.headers.token;
    
        if (!token) {
            return res.send("Please login first");
        }
    
        const decoded = jwt.verify(token, JWT_SECRET);
    
        req.user = decoded;
    
        next();
    }
    app.get("/dashboard", auth, function(req, res){
        res.send({
            message: "welcome to dashboard",
            username: req.username
        })
    })
    app.post("/notes", auth, function(req, res){
        const note = req.body.note;
        notes.push({
            username: req.username,
            note: note
        })
        res.send("Notes Created successfully")
    })


app.listen(3000);