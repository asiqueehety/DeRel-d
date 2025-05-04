import React, {useEffect, useState} from "react";
import TopicCard from "./TopicCard";
import MainProfile from "./mainProfile";
import ProfileExtras from "./ProfileExtras";
import ProfileStats from "./ProfileStats";

export default function Profile()
{
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/profile")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch profile");
                return res.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load profile info.");
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Loading profile...</p>;
    }

    // const profile = [


//];


    const username = user.profile.username;
    const email = user.profile.emailaddress;
    const location = user.profile.location;
    const dp = user.profile.pro_picture;
    const bio = user.profile.bio;
    const interests = user.interests;

    return (
        <div id="profileContainer">
            <div id="profilePage">
                <MainProfile dp={dp} uname={username} email={email} location={location} />
                <ProfileExtras bio={bio} interests={interests}/>
                <ProfileStats />
            </div>
            <div>

                <p id="createdTopicsTitle"> <strong>Created Topics</strong></p>
                <div id="createdTopicsContainer">
                    {user.posts.map((topic) => (
                        <TopicCard
                            key={topic.post_id}
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