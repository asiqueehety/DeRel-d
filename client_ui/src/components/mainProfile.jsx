import React from "react";

export default function MainProfile(props)
{
    return (
        <div>
            <h1 id="profileTop">Profile</h1>
            <div id="profileCard">
                <img src={props.dp} alt="Profile" id="profilePic" />
                <p id="profileUsername" >Username: <strong>{props.uname}</strong></p>
                <p id="profileEmail">Email: {props.email} </p>
                <p id="profileCountry">Country: {props.location}</p>
            </div>
        </div>    
            
    )
}