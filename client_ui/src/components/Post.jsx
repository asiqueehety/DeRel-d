import React, {useState , useEffect} from "react";
import RatingSlider from "./RatingSlider";



export default function Post(props)
{

    const [showSlider, setShowSlider] = useState(false);
    const [rating, setRating] = useState("Rate");
    const [follow, setFollow] = useState("Follow");

    useEffect(() => {
        fetch(`api/isFollowing?post_id=${props.post_id}`, {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            setFollow(data.isFollowing ? "Unfollow" : "Follow");
        })
        .catch(err => {
            console.error("Failed to fetch follow status", err);
        });
    }, [props.post_id]); // re-run if post_id changes



    function handleFollow()
    {
        if (follow === "Follow")
        {
            setFollow("Unfollow");
            fetch("/api/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_id: props.post_id }),
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to follow user");
                return res.json();
            })
            .then(data => {
                console.log("Followed successfully:", data);
            })
            .catch(err => {
                console.error(err);
            });
        }
        else
        {
            setFollow("Follow");
            fetch("/api/unfollow", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_id: props.post_id }),
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to unfollow user");
                return res.json();
            })
            .then(data =>
                {
                    console.log("Unfollowed successfully:", data);
                }
            )
        }
    }

    function handleMouseOver() {
        setShowSlider(true);
    }

    function handleMouseOut() {
        setShowSlider(false);
    }

    function handleRatingChange(value) {
        setRating(`${value}`);
    }

    return(
        <div id="post">
            <h2 id="topicTitle" >{props.title}</h2>
            <img src={props.image} alt="Post" />
            <p id="topicHtags">
                {props.hashtags.map((hashtag, index) => (
                    <button key={index} className="hashtag">{hashtag}</button>
                ))}
            </p>
            <p id="topicDesc">{props.description}</p>
            <div id="sliderBtn" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                {showSlider ? <RatingSlider onChange={handleRatingChange}/> : rating}
            </div>
            <div id="postTags">
                <button className="btnn hacker BtnTxt" onClick={handleFollow} >{follow}</button>
                <button className="btnn hacker BtnTxt">Create Thread</button>
                <button className="btnn hacker BtnTxt">Threads</button>
            </div>
            <div id="topicInfo">
                <button id="topicUname"><strong>{props.username}</strong></button>
                <button id="topicDate"><strong>{props.date}</strong></button>
                <button id="topicTime"><strong>{props.time}</strong></button>
                <button id="topicLocation"><strong>{props.location}</strong></button>
            </div>
        </div>
    )
}