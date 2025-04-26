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
            <h2>{props.title}</h2>
            <img src={props.image} alt="Post" />
            <p>{props.description}</p>
            <div id="postTags">
                <button className="btnn hacker BtnTxt">Like</button>
                <div className="btnn hacker BtnTxt" id="sliderBtn" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                    {showSlider ? <RatingSlider onChange={handleRatingChange}/> : rating}
                </div>
                <button className="btnn hacker BtnTxt">Comment</button>
            </div>
            <p>Posted by: <strong>{props.username}</strong></p>
            <p>Posted on: <strong>{props.date}</strong></p>

        </div>
    )
}