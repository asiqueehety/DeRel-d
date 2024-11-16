const express = require('express'); // Change import to require
const path = require('path'); // Change import to require

const app=express()

app.use(express.static(path.join(__dirname, 'public')));
const port=3000

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define the views directory if it's not in the default location
app.set('views', path.join(__dirname, 'views')); // Adjust the path if your views are in a different directory


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

app.get("/login",(req,res)=>
{
    res.render("login.ejs")
})

app.get("/signup",(req,res)=>
{
    res.render("signup.ejs")
})


