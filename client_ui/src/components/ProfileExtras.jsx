import React,{useState} from "react";
export default function ProfileExtras(props)
{
    const [bio, setBio] = useState(props.bio);
    const [interests, setInterests] = useState(props.interests || []);


    function rmvInterest(index)
    {
        const newInterests = [...interests];
        const interestToRemove = newInterests[index];
        newInterests.splice(index, 1);
        setInterests(newInterests);

        fetch("/api/profile/interests", 
        {
            method: "DELETE",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({interest: interestToRemove}),
        })
        .then(res =>
        {
            if (!res.ok) throw new Error("Failed to remove interest");
            return res.json();
        })
        .then(data =>
        {
            console.log(data);
        })
            .catch(error =>
            {
                console.error("Error:", error);
            }
        );
    }

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
                        <div key={index} id="extrasInterests">
                            <p id="ProfileExtras_interests">{interest}</p>
                            <button className="btnn rmvBtn" onClick={()=> rmvInterest(index)}></button>
                        </div>
                    ))}
                </div>
                <button className="btnn hacker" onClick={addInterests}>+ Add interests</button>
            </div>
        </div>
        
    )
}