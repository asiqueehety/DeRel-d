import React from "react";

export default function Thread(props)
{
    const username = props.username;
    const reply = props.reply;
    const time = props.time;
    const location = props.location;
    return (
        <div id="threadReplies">
            <h3>{username}</h3>
            <p>{reply}</p>
            <h5>{time}</h5>
            <h5>{location}</h5>
        </div>
    )
}