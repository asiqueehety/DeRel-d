const express = require('express'); // Change import to require
const path = require('path'); // Change import to require
const bp = require('body-parser');
const pg = require('pg');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'ni99a', // replace with a secure random string
  resave: false,
  saveUninitialized: false
}));


const Auth = require('./auth.js'); // Import the Auth function
const { log } = require('console');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const port = 4000

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



function requireLogin(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    next();
  }
  


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
                        req.session.userId = result.rows[0].id; // user ID in database
                        console.log("User ID:", req.session.userId); // Log the user ID for debugging
                        
                        res.redirect('/home')
                    }
                }
            );
        }
    );

    app.use(express.static(path.join(__dirname, "client_ui", "build")));

    app.get("/home", requireLogin, (req, res) => {
      res.sendFile(path.join(__dirname, "client_ui", "build", "index.html"));
    });


// HERE NOW, WE DESIGN BACKEND FOR THE MAIN WEBSITE

app.post("/createTopic", requireLogin,
    (req, res) => 
    {
        const userId = req.session.userId; // Use the userId variable from the login process
        var user1 = {}; // Initialize user1 as an empty object
        db.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).send("Database error nigga");
            }

            if (result.rows.length === 0) {
                return res.status(404).send("User not found");
            }

            user1 = result.rows[0];
            console.log(user1); // Log the user object to see its properties
        });

        const title = req.body.title;
        const desc = req.body.description;
        const hashtags = req.body.hashtags;
        const image = "/resources/"+(req.body.image); // Assuming you handle image upload separately
        const location = user1.location; // Assuming you have a location field in the user object
        const created_at = new Date().toUTCString();
        const updated_at = new Date().toUTCString();

        db.query
        (
            "INSERT INTO posts (title, description, image, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)",
            [title, desc, image, userId, created_at, updated_at],
            (err) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).send("Database error");
                }
                db.query("SELECT * FROM posts WHERE title = $1", [title], (err, result) =>
                {
                    if (err) {
                        console.error("Database Error:", err);
                        return res.status(500).send("Database error");
                    }

                    if (result.rows.length === 0) {
                        return res.status(404).send("Post not found after insertion");
                    }

                    const post = result.rows[0];
                    console.log(post);
                });
                
                
                res.redirect('/home'); // Redirect to the home page after successful topic creation
            }
        );
    });


app.get("/api/profile", requireLogin, (req, res) => {
    const userId = req.session.userId; // Get the user ID from the request parameters
    db.query("select * from posts where posts.user_id=$1;", [userId], (err, result) =>
    {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        const posts = result.rows;

        //I want to also do another db query where I get all the interests of the user and add it to the user object's first entry as an array of interests
        db.query("SELECT interests.interest FROM user_interests INNER JOIN interests ON user_interests.interest_id=interests.interest_id WHERE user_interests.user_id = $1", [userId], (err2, result2) =>
        {
            if (err2) {
                console.error("Database Error:", err);
                return res.status(500).send("Database error");
            }
            const interests = result2.rows.map(row => row.interest); // Extract interests from the result

            db.query("SELECT id, username, emailaddress, pro_picture, location, community_id FROM users WHERE id=$1", [userId], (err3, result3) =>
            {
                if (err3) {
                    console.error("Database Error:", err);
                    return res.status(500).send("Database error");
                }

                if (result3.rows.length === 0) {
                    return res.status(404).send("User not found");
                }

                const profile = result3.rows[0];
                db.query("SELECT bio FROM user_extras WHERE user_id=$1", [userId], (err4, result4) =>
                {
                    if (err4) {
                        console.error("Database Error:", err);
                        return res.status(500).send("Database error");
                    }
                    profile.bio = result4.rows[0].bio; // Add the bio to the profile object

                    const response =
                    {
                        profile,
                        interests,
                        posts,
                    };
                    res.json(response); // Send the response as JSON
                });
            });
        });
    });
});

app.get("/api/posts", (req, res) => {
    db.query("SELECT posts.*, users.username, users.location FROM posts INNER JOIN users ON posts.user_id = users.id", (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        if (result.rows.length === 0) {
            return res.status(404).send("No posts found");
        }

        const posts = result.rows;
        res.json(posts);
    });
});


app.put("/api/profile/bio", requireLogin, (req, res) => {
    const userId = req.session.userId; // Get the user ID from the request parameters
    const newBio = req.body.bio; // Get the new bio from the request body

    db.query("INSERT INTO user_extras(bio,user_id) VALUES ($1,$2) ON CONFLICT (user_id) DO UPDATE SET bio = EXCLUDED.bio RETURNING bio;", [newBio, userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        const bio = result.rows[0].bio;
        res.json({bio});
    });
});

app.put("/api/profile/interests", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const newInterest = req.body.interest;

    const query = `
        WITH ins AS (
            INSERT INTO interests (interest)
            VALUES ($1)
            ON CONFLICT (interest) DO NOTHING
            RETURNING interest_id
        )
        SELECT interest_id FROM ins
        UNION
        SELECT interest_id FROM interests WHERE interest = $1;
    `;

    db.query(query, [newInterest], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        const interestId = result.rows[0].interest_id;

        db.query(
            "INSERT INTO user_interests(user_id, interest_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;",
            [userId, interestId],
            (err2) => {
                if (err2) {
                    console.error("Database Error:", err2);
                    return res.status(500).send("Database error");
                }

                res.json({ interest: newInterest });
            }
        );
    });
});

app.delete("/api/profile/interests", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const interestToRemove = req.body.interest;

    db.query("DELETE FROM user_interests WHERE user_id = $1 AND interest_id = (SELECT interest_id FROM interests WHERE interest = $2)", [userId, interestToRemove], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        res.json({ message: "Interest removed successfully" });
    });
});

app.post("/api/follow", requireLogin, (req, res) => 
{
    const userId = req.session.userId;
    const post_id = req.body.post_id; // Assuming post_id is sent in the request body
    db.query("INSERT INTO following (post_id, follower_id) VALUES ($1, $2)", [post_id, userId], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }
        res.json({ message: "Followed successfully" });
    });
});

app.delete("/api/unfollow", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const post_id = req.body.post_id; // Assuming post_id is sent in the request body
    db.query("DELETE FROM following WHERE post_id = $1 AND follower_id = $2", [post_id, userId], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }
        res.json({ message: "Unfollowed successfully" });
    });
});

app.get("/api/isFollowing", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const post_id = req.query.post_id; // Assuming post_id is sent

    db.query("SELECT * FROM following WHERE post_id = $1 AND follower_id = $2", [post_id, userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        res.json({ isFollowing: result.rows.length > 0 });
    });
});

app.get("/api/topicsFollowing", requireLogin, (req, res) =>
{
    const userId = req.session.userId; // Get the user ID from the session

    db.query("SELECT posts.* FROM posts INNER JOIN following ON posts.post_id = following.post_id WHERE following.follower_id = $1", [userId], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        const topics = result.rows;
        res.json(topics); // Send the topics as JSON response
    });
});


app.put("/api/rating", requireLogin, (req, res) => 
{
    const userId = req.session.userId;
    const rating = req.body.rating;
    const post_id = req.body.post_id;

    db.query("INSERT INTO post_ratings (post_id, rater_id, rating) VALUES ($1, $2, $3) ON CONFLICT (post_id, rater_id) DO UPDATE SET rating = EXCLUDED.rating", [post_id, userId, rating], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }
        res.json({ message: "Rating updated successfully" });
    });
});

app.get("/api/rating", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const post_id = req.query.post_id;

    db.query("SELECT rating FROM post_ratings WHERE post_id = $1 AND rater_id = $2", [post_id, userId], (err, result) => {
        if (err) {
            return res.json({ rating : 0 });
        }

        if (result.rows.length === 0) {
            return res.json({ rating: 0 });
        }

        const rating = result.rows[0].rating;
        return res.json({ rating });
    });
});

app.get("/api/followCount", requireLogin, (req, res) => {
    const userId = req.session.userId;
    const post_id = req.query.post_id; // Assuming post_id is sent in the request body

    db.query("SELECT COUNT(*) FROM following WHERE post_id = $1", [post_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        const followCount = parseInt(result.rows[0].count, 10);
        res.json({ followCount });
    });
});

// app.post("/api/threads", requireLogin, (req, res) => {
//     const post_id = req.body.post_id; // Assuming post_id is sent in the request body
//     const userId = req.session.userId;
//     const reply = req.body.reply;
//     const time = new Date().toUTCString();

//     db.query("insert into thread_replies (reply_order,reply,replier_id,created_at) values ($1,$2,$3,$4)", [0,reply,userId,time], (err, result) => {
//         if (err) {
//             console.error("Database Error:", err);
//             return res.status(500).send("Database error");
//         }
//         db.query("SELECT thread_id FROM thread_replies WHERE reply_order = $1 AND reply= $2 AND replier_id= $3 AND created_at = $4", [0,reply,userId,time], (err, result) => {
//             if (err) {
//                 console.error("Database Error:", err);
//                 return res.status(500).send("Database error");
//             }

//             const thread_id = result.rows[0].thread_id;
//             db.query("INSERT INTO threads (post_id, thread_id) VALUES ($1, $2)", [post_id, thread_id], (err) => {
//                 if (err) {
//                     console.error("Database Error:", err);
//                     return res.status(500).send("Database error");
//                 }
//                 db.query("INSERT INTO thread_participants (thread_id, pcp_id) VALUES ($1, $2)", [thread_id, userId], (err) => {
//                     if (err) {
//                         console.error("Database Error:", err);
//                         return res.status(500).send("Database error");
//                     }
//                     db.query("INSERT INTO ongoing_threads (thread_id, user_id, permission) VALUES ($1, $2, $3)", [thread_id, userId, 'true'], (err) => {
//                         if (err) {
//                             console.error("Database Error:", err);
//                             return res.status(500).send("Database error");
//                         }
//                         res.status(201).send("Thread created successfully");
//                     });
//                 });
//             });
//         });
//     })
// });

app.post("/api/threads", requireLogin, async (req, res) => {
  const { post_id, reply } = req.body;
  const userId = req.session.userId;
  const time = new Date().toUTCString();

  try {
    await db.query('BEGIN');

    const insertReply = 
    await db.query(
      `INSERT INTO thread_replies (reply_order, reply, replier_id, created_at)
       VALUES ($1, $2, $3, $4) RETURNING thread_id`,
      [0, reply, userId, time]
    );

    const thread_id = insertReply.rows[0].thread_id;

    await db.query(`INSERT INTO threads (post_id, thread_id) VALUES ($1, $2)`, [post_id, thread_id]);

    await db.query(`INSERT INTO thread_participants (thread_id, pcp_id) VALUES ($1, $2)`, [thread_id, userId]);

    await db.query(`INSERT INTO ongoing_threads (thread_id, user_id, permission) VALUES ($1, $2, $3)`, [thread_id, userId, 'true']);

    await db.query('COMMIT');

    res.status(201).send("Thread created successfully");
  } catch (err) {
    await db.query('ROLLBACK');
    console.error("Database Error:", err);
    res.status(500).send("Database error");
  }
});



app.get("/api/threadCount", requireLogin, (req, res) => 
{
    const userId = req.session.userId;
    const post_id = req.query.post_id; // Assuming post_id is sent in the request body
    db.query("SELECT COUNT(thread_id) FROM threads WHERE post_id = $1", [post_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }

        const threadCount = parseInt(result.rows[0].count, 10);
        res.json({ threadCount });
    });
});

app.get("/api/threads", requireLogin, (req, res) => {
    const post_id = req.query.post_id; // Assuming post_id is sent in the request body

    db.query(
        `select users.username, users.pro_picture, users.location, thread_replies.reply, thread_replies.created_at
        from threads
        inner join thread_replies on threads.thread_id=thread_replies.thread_id
        inner join users on thread_replies.replier_id=users.id
        where threads.post_id=$1`
        , [post_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database error");
        }
        const threads = result.rows;
        res.json(threads);
    });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout Error:", err);
            return res.status(500).send("Failed to log out");
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send("Logged out successfully");
    });
});

app.get("/api/ongoing-pcp", requireLogin, (req, res) => {
    const userId = req.session.userId;

    db.query
    (
        `select distinct posts.*, users.username, users.location from posts
        inner join threads on posts.post_id = threads.post_id
        inner join ongoing_threads on threads.thread_id = ongoing_threads.thread_id
        inner join users on users.id = posts.user_id
        where ongoing_threads.user_id = $1`,
        [userId], (err, result) =>
        {
            if (err) 
            {
                console.error("Database Error:", err);
                return res.status(500).send("Database error");
            }

        const ongoingThreads = result.rows;
        console.log("Ongoing Threads:", ongoingThreads);
        res.json(ongoingThreads);
    });
});