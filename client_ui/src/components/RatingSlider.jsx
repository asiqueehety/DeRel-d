import React, {useState} from "react";

export default function RatingSlider({onChange})
{

    const [rating, setRating] = useState(0); // Default rating value but we will integrate database into this here nd then we will set it to the value from the database
    function handleSliderChange(event) 
    {
        setRating(event.target.value); // Update the rating state with the slider value
        onChange(event.target.value); // Call the onChange prop with the new rating value
    }


    return(
        <div>
            <input type="range" min="-10" max="10" step="0.1" className="slider" id="ratingSlider" onChange={handleSliderChange} value={rating}/>
        </div>
    )
}