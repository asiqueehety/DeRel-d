import React, {useEffect, useState} from "react";
import TopicCard from "./TopicCard";
import MainProfile from "./mainProfile";


export default function Profile() {


    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);

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

    const username = profile[0].username;
    const email = profile[0].emailaddress;
    const location = profile[0].location;
    const dp = profile[0].pro_picture;

    return (
        <div id="profileContainer">
            <div id="profilePage">
                <MainProfile dp={dp} uname={username} email={email} location={location} />
                <div id="profileExtras">
                    <h2>Bio</h2>
                    <p>Ami onek bhalo chele. Tomra shobai kharap.</p>
                    <h2>Interests: likes to play games</h2>
                </div>
                <div id="profileStats">
                    <div id="profileFollowing"><p>statsssssssssssssss</p></div>
                    <div id="profileFollowers"></div>
                    <div id="profileNumOfTopics"></div>
                    <div id="profileNumOfThreads"></div>

                </div>
            </div>
            <div>

                <p id="createdTopicsTitle"> <strong>Created Topics</strong></p>
                <div id="createdTopicsContainer">
                    {profile.map((topic) => (
                        <TopicCard
                            key={topic.id}
                            image={topic.image}
                            title={topic.title}
                            description={topic.description}
                        />
                    ))}
                </div>
            </div>
        </div>
            

    )
}