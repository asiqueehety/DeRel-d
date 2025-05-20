import React, {useState , useEffect, use} from "react";
import RatingSlider from "./RatingSlider";
import Thread from "./Thread";
import CreateThread from "./CreateThread";


export default function Post(props)
{
    const [showSlider, setShowSlider] = useState(false);
    const [rating, setRating] = useState("Rate");
    const [follow, setFollow] = useState("Follow");
    const [followCount, setFollowCount] = useState(0);
    const [threadCount, setThreadCount] = useState(0);
    const [showFollow, setShowFollow] = useState("hidden");
    const [showThreadCount, setShowThreadCount] = useState("hidden");
    const [showThreads, setShowThreads] = useState(false);
    const [threads, setThreads] = useState([]);
    const [showCreateThread, setShowCreateThread] = useState(false);

    useEffect(() => {
    }, [props.post_id]); // re-run if post_id changes

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

    useEffect(() => 
        {
            fetch(`api/rating?post_id=${props.post_id}`,
            {
            method: "GET",
            credentials: "include",
            headers:
                {
                    "Content-Type": "application/json",
                },
            })
            .then(response =>
            {
                if (!response.ok) throw new Error("Failed to fetch rating");
                return response.json();
            })
            .then(data =>
            {
                data.rating? setRating(data.rating) : setRating("Rate");
            })
            .catch(err =>
            {
                console.error("Failed to fetch rating", err);
                setRating("Rate");
            });
    }, [props.post_id]); // re-run if post_id changes

    useEffect(() =>
    {
        fetch(`api/followCount?post_id=${props.post_id}`,
        {
            method: "GET",
            credentials: "include",
            headers:
                {
                    "Content-Type": "application/json",
                },
        })
        .then(response =>
        {
            if (!response.ok) throw new Error("Failed to fetch follow count");
            return response.json();
        })
        .then(data =>
        {
            setFollowCount(data.followCount);
        })
        .catch(err =>
        {
            console.error("Failed to fetch follow count", err);
            setFollowCount(0);
        });
    }, [props.post_id]); // re-run if post_id changes

    useEffect(() =>
    {
        fetch(`/api/threadCount?post_id=${props.post_id}`,
        {
            method: "GET",
            credentials: "include",
            headers:
                {
                    "Content-Type": "application/json",
                },
        })
        .then(response =>
        {
            if (!response.ok) throw new Error("Failed to fetch thread count");
            return response.json();
        })
        .then(data =>
        {
            setThreadCount(data.threadCount);
        })
        .catch(err =>
        {
            console.error("Failed to fetch thread count", err);
            setThreadCount(0);
        });
    }, [props.post_id]); // re-run if post_id changes

    function handleShowThreads()
    {
        fetch(`/api/threads?post_id=${props.post_id}`, {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch threads");
            return response.json();
        })
        .then(data => {
            setThreads(data);
            console.log("Threads fetched successfully:", data);
        })
        .catch(err => {
            console.error("Failed to fetch threads", err);
            setThreads([]);
        });
        setShowThreads(!showThreads);

    }
    function handleCreateThreadClick()
    {
        setShowCreateThread(!showCreateThread);
    }
    function handleFollow()
    {
        if (follow === "Follow")
        {
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
                setFollow("Unfollow");
                setFollowCount(prevCount => prevCount + 1);
            })
            .catch(err => {
                console.error(err);
            });
        }
        else
        {
            
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
                    setFollow("Follow");
                    setFollowCount(prevCount => prevCount - 1);
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
    function handleFollowOver(){
        setShowFollow("visible");
    }
    function handleFollowOut(){
        setShowFollow("hidden");
    }
    function handleCTover(){
        setShowThreadCount("visible");
    }
    function handleCTout(){
        setShowThreadCount("hidden");
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
                {showSlider ? <RatingSlider post_id={props.post_id} onChange={handleRatingChange}/> : rating}
            </div>
            <div id="postTags">
                <button className="btnn hacker BtnTxt" onClick={handleFollow} onMouseOver={handleFollowOver} onMouseOut={handleFollowOut}>{follow} <p className="Count" style={{visibility:showFollow}}>{followCount}</p> </button>
                <button className="btnn hacker BtnTxt" onClick={handleCreateThreadClick}>Create Thread</button>
                <button className="btnn hacker BtnTxt" onMouseOver={handleCTover} onMouseOut={handleCTout} onClick={handleShowThreads}>Threads <p className="Count" style={{visibility:showThreadCount}}>{threadCount}</p> </button>
            </div>
            
            <div id="topicInfo">
                <button id="topicUname"><strong>{props.username}</strong></button>
                <button id="topicDate"><strong>{props.date}</strong></button>
                <button id="topicTime"><strong>{props.time}</strong></button>
                <button id="topicLocation"><strong>{props.location}</strong></button>
            </div>
            <div className={`threadContainer ${showCreateThread ? "show" : "hide"}`}>
                <CreateThread post_id={props.post_id} threadCount={threadCount} setThreadCount={setThreadCount} setShowCreateThread={setShowCreateThread} setShowThreads={setShowThreads}/>
            </div>
            <div id="threadsMap" className={`threadContainer ${showThreads ? "show" : "hide"}`}>
                {threads && threads.length > 0 ? (
                    threads.map((thread, index) => (
                    <Thread key={index} thread={thread} post_id={props.post_id} />
                    ))
                ) : (
                    <p>No threads yet.</p>
                )}
            </div>
        </div>
    )
}