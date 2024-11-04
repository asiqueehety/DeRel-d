import express from "express"

const app=express()
const port=3000

app.get("/",(req,res)=>{
    res.render("index.ejs")
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


