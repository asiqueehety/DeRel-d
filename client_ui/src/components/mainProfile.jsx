import React from "react";

export default function MainProfile(props)
{
    function handleEditprofile(event) {
    }

    function handleLogout(event) {
        event.preventDefault();
        fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to log out");
            window.location.href = "/login"; // Redirect to login page
        })
        .catch(err => {
            console.error("Logout failed", err);
        });
    }

    return (
        <div>
            <h1 className="profileTop">Profile</h1>
            <div id="profileCard">
                <img src={props.dp} alt="Profile" id="profilePic" />
                <p id="profileUsername" ><strong>{props.uname}</strong></p>
                <p id="profileEmail">{props.email} </p>
                <p id="profileCountry">{props.location}</p>
                
                
            </div>
            <div>
                <button className="btnn hacker" id="editProfileBtn" onClick={handleEditprofile}><img src="/resources/editprofile.png" alt="Edit Profile"></img></button>
                <button className="btnn hacker" id="logoutBtn" onClick={handleLogout}><img src="/resources/logout.png" alt="Logout"></img></button>
            </div>
        </div>    
    )
}