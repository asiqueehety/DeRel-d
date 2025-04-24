import React from "react";
import RatingSlider from "./RatingSlider";

export default function Post(props)
{
    return(
        <div id="post">
            <h2>{props.title}</h2>
            <img src={props.image} alt="Post" />
            <p>{props.description}</p>
            <div id="postTags">
                <button className="btnn hacker BtnTxt">Like</button>
                <button className="btnn hacker BtnTxt">rate</button>
                <button className="btnn hacker BtnTxt">Comment</button>
            </div>
            <p>Posted by: <strong>{props.username}</strong></p>
            <p>Posted on: <strong>{props.date}</strong></p>

            <RatingSlider />

        </div>
    )
}