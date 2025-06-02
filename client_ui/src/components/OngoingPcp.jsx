import {useEffect, useState} from "react";
import Post from "./Post";



export default function OngoingPcp() {

  const [pcp, setPcp] = useState([]);
  useEffect(() => {
    fetch(`/api/ongoing-pcp`, {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            }
          })
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch ongoing PCP data");
        return response.json();
      })
      .then(data => {
        setPcp(data);
      })
      .catch(err => {
        console.error("Error fetching ongoing PCP data:", err);
      });
  }, []);

  return (
    <div className="middlePane">
      {
      pcp.map((post)=>
          <Post 
            key={post.post_id} 
            post_id={post.post_id}
            user_id={post.user_id}
            username={post.username} 
            title={post.title} 
            description={post.description} 
            image={post.image}
            date={post.created_at}
            updated_at={post.updated_at}
            location={post.location}
            hashtags={post.hashtags || []}
          />
        )
      }
    </div>
  );
}
