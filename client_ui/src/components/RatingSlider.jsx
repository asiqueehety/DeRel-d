import React, {useState , useEffect} from "react";

export default function RatingSlider({onChange , post_id})
{

    const [rating, setRating] = useState(0); // Default rating value but we will integrate database into this here nd then we will set it to the value from the database
    
    useEffect(() => {
        fetch(`/api/rating?post_id=${post_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch rating");
            return res.json();
        })
        .then(data => {
            setRating(data.rating);
        })
        .catch(err => {
            console.error(err);
        });
    }, [post_id]);
    
    function handleSliderChange(event) 
    {
        setRating(event.target.value); // Update the rating state with the slider value
        onChange(event.target.value); // Call the onChange prop with the new rating value

        fetch("/api/rating", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: event.target.value , post_id: post_id }),
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update rating");
            return res.json();
        })
        .then(data =>
            {
                console.log(data);
            });
    }




    return(
        <div>
            <input type="range" min="-10" max="10" step="0.1" className="slider" id="ratingSlider" onChange={handleSliderChange} value={rating}/>
        </div>
    )
}