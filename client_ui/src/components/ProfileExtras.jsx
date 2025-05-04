import React,{useState} from "react";

export default function ProfileExtras(props)
{
    const [bio, setBio] = useState(props.bio);
    const [interests, setInterests] = useState(props.interests || []);

    function addInterests()
    {
        const newInterest = prompt("Enter your new interest:");
        if (newInterest) 
        {
            fetch("/api/profile/interests", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ interest: newInterest }),
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to add interest");
                return res.json();
            })
            .then(data => {
                console.log("Interest added successfully:", data);
                setInterests(prev => [...prev, data.interest]);
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
    function editBio()
    {
        const newBio = prompt("Enter your new bio:");
        if (newBio) 
        {
            fetch("/api/profile/bio", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio: newBio }),
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update bio");
                return res.json();
            })
            .then(data => {
                console.log("Bio updated successfully:", data);
                setBio(newBio); // Update the local state with the new bio
            })
            .catch(err => {
                console.error(err);
            });
        }
    }


    return(
        <div>
            <h2 className="profileTop">Bio</h2>
            <div id="profileExtras_bio">
                <p>{bio}</p>
                <button className="btnn hacker" onClick={editBio}>🛠️ Edit bio</button>
            </div>
            <h2 className="profileTop">Interests</h2>
            <div> 
                <div>
                    {interests.map((interest, index) => (
                        <p key={index} id="ProfileExtras_interests">{interest}</p>
                    ))}
                </div>
                <button className="btnn hacker" id="ProfileExtras_interestsBtn" onClick={addInterests}>+ Add interests</button>
            </div>
        </div>
        
    )
}