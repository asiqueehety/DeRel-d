const express = require('express'); // Change import to require
const path = require('path'); // Change import to require
const bp = require('body-parser');
const pg = require('pg');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000

var authKey='';
var u='',p='',e='';

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

        u = req.body.username;
        p = req.body.pw;
        e = req.body.email;
        r = req.body.retypepw;
        if(p!=r)
        {
            res.send
            (
                `<script>
                    alert("PASSWORDS DON'T MATCH");
                    window.location.href="/signup";
                </script>`);
        }
        else
        {
            authKey=generateString(6);
            console.log(authKey);
            res.render("confirm.ejs",{suc:false});
        }
    });

    app.post("/confirmCheck",
        (req,res)=>
        {
            const code=req.body.code;
            if(code==authKey)
            {
                res.render("confirm.ejs",{suc:true});
                db.query("INSERT INTO users (username,emailaddress,pword) VALUES ($1,$2,$3)",[u,e,p],(err,result)=>
                {
                    if(err){
                        console.log(err);
                        res.send("Error");
                    }
                    else
                    {
                        console.log(result);
                    }
                });
                u='';
                p='';
                e='';
                authKey='';
            }
        }
    );

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

