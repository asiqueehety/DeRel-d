const express = require('express'); // Change import to require
const path = require('path'); // Change import to require
const bp = require('body-parser');
const pg = require('pg');
const app = express();

const Auth = require('./auth.js'); // Import the Auth function

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
  password: Auth,
  port: 5432,
});
db.connect();

app.use(bp.urlencoded({ extended: true }));


//SHOWS THE HOME PAGE
app.get("/",(req,res)=>{
    res.render("index.ejs")
})

//PORT RUNNING NOTIFICATION
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
app.get("/login",(req,res)=>
{
    res.render("login.ejs",{user_not_found: false, suc: false});
})
app.get("/signup",(req,res)=>
{
    res.render("signup.ejs")
})
//sends a code into the user's email to verify his mail identity
app.post("/confirm",
    (req,res)=>
    {
        console.log(req.body);

        u = req.body.username;
        p = req.body.pw;
        e = req.body.email;
        r = req.body.retypepw;
        
            authKey=generateString(6);
            console.log(authKey);
            res.render("confirm.ejs",{suc:'0'});
    });
//checks the code entered by the user 
app.post("/confirmCheck",
    (req,res)=>
    {
        const code=req.body.code;
        if(code==authKey)
        {
            res.render("confirm.ejs",{suc:'1'});
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
        else
        {
            res.render("confirm.ejs",{suc:'2'});
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

app.use(express.json());
app.post("/check-availability", (req, res) => {
    const { field, value } = req.body; // Extract field (username or email) and value

    let query = "";
    if (field === "email")
    {
        query = "SELECT * FROM users WHERE emailaddress = $1";
    }
    else if (field === "username")
    {
        query = "SELECT * FROM users WHERE username = $1";
    }
    else
    {
        return res.json({ error: "Invalid field" });
    }

    db.query(query, [value], (err, result) =>
    {
        if (err)
        {
            console.error("Database Error:", err);
            return res.json({ error: "Database error" });
        }

        if (result.rows.length > 0)
        {
            res.json({ exists: true }); // Username or email already exists
        }
        else
        {
            res.json({ exists: false }); // Available
        }
    });
});

// UNTIL NOW, ALL WAS ABOUT SIGN UP BACKEND DESIGN

//FROM NOW ON, STARTS LOGIN BACKEND DESIGN

    app.post("/login",
        (req,res)=>
        {
            const en = req.body.emname;
            const pw = req.body.password;
            db.query("SELECT * FROM users WHERE (emailaddress = $1 or username= $1) and pword= $2 ",[en,pw],
                (err,result)=>
                {
                    if(err || result.rows.length === 0)
                    {
                        res.render("login.ejs",{user_not_found : true, suc : false});
                    }
                    else
                    {
                        // res.render("login.ejs",{user_not_found : false, suc : true});
                        res.redirect('/home')
                    }
                }
            );
        }
    );

    app.use(express.static(path.join(__dirname, "client_ui", "build")));

    app.get("/home", (req, res) => {
      res.sendFile(path.join(__dirname, "client_ui", "build", "index.html"));
    });