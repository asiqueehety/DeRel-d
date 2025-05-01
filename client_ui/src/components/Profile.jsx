import React, {useEffect, useState} from "react";

export default function Profile() {


    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/profile")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch profile");
                return res.json();
            })
            .then(data => {
                setProfile(data);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load profile info.");
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }
    return (
        <div id="profile">
            <h1>Profile</h1>
            <img src={profile.pro_picture} alt="Profile" id="profilePic" />
            <p>Username: <strong>{profile.username}</strong></p>
            <p>Email: {profile.emailaddress} </p>
            <p>Country: {profile.location}</p>
            
        </div>
    )
}