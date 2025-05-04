import React from "react";

export default function MainProfile(props)
{
    return (
        <div>
            <h1 className="profileTop">Profile</h1>
            <div id="profileCard">
                <img src={props.dp} alt="Profile" id="profilePic" />
                <p id="profileUsername" ><strong>{props.uname}</strong></p>
                <p id="profileEmail">{props.email} </p>
                <p id="profileCountry">{props.location}</p>
            </div>
        </div>    
            
    )
}