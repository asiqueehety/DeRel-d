import React, {useState} from "react";
import RatingSlider from "./RatingSlider";



export default function Post(props)
{

    const [showSlider, setShowSlider] = useState(false);
    const [rating, setRating] = useState("Rate");

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
                <button className="btnn hacker BtnTxt">Follow</button>
                <button className="btnn hacker BtnTxt">Create Thread</button>
            </div>
            <p id="topicUname">Posted by: <strong>{props.username}</strong></p>
            <p id="topicDate">Posted on: <strong>{props.date}</strong></p>
        </div>
    )
}