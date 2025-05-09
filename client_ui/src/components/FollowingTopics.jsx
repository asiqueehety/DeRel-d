import React, {useState , useEffect} from "react";
import TopicCard from "./TopicCard";
import Post from "./Post";

export default function FollowingTopics() {

  const [topicsFollowings, setTopicsFollowings] = useState([]);

  useEffect(() => 
  {
    fetch(`api/topicsFollowing`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Topics followed:", data);
      setTopicsFollowings(data);
    })
    .catch((error) => {
      console.error("Error fetching topics followed:", error);
    });
  },[]);

  return (
    <div className="middlePane">
      {
        topicsFollowings.map((topic) => (
          <Post key={topic.post_id} post_id={topic.post_id} title={topic.title} description={topic.description} image={topic.image} hashtags={topic.hashtags || []} />
        ))
      }
    </div>
  );
}
