import React, {useEffect, useState} from "react";
import Post from "./Post";

export default function MiddlePane()
{

    const [posts, setPosts] = useState(null);

    useEffect(() => {
            fetch("/api/posts")
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch profile");
                    return res.json();
                })
                .then(data => {
                    setPosts(data);
                })
                .catch(err => {
                    console.error(err);
                });
        }, []);
    
        if (!posts) {
            return <p>Loading topics...</p>;
        }
    const hashtags2=[];
    return(
        <div id="feed">
            {
                posts.map((post) => (
                    <Post key={post.post_id} post_id={post.post_id} title={post.title} image={post.image} username={post.username} date={post.created_at} description={post.description} hashtags={hashtags2} location={post.location}/>
                ))
            }
        </div>
    );
}