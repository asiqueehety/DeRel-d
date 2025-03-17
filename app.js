const express = require('express'); // Change import to require
const path = require('path'); // Change import to require
const bp = require('body-parser');
const pg = require('pg');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define the views directory if it's not in the default location
app.set('views', path.join(__dirname, 'views')); // Adjust the path if your views are in a different directory

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "@sique1234Ass",
  port: 5432,
});
db.connect();

app.use(bp.urlencoded({ extended: true }));



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

app.post("/confirm",
    (req,res)=>
    {
        console.log(req.body);

        const u=req.body.username;
        const p=req.body.pw;
        const e=req.body.email;
        const r=req.body.retypepw;

        if(p!=r)
        {
            res.send
            (
                `<script>
                    alert("PASSWORDS DONT MATCH");
                    window.location.href = "/signup";
                </script>`);
        }
        else
        {
            
        }
    });


