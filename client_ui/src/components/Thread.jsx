import React from "react";

export default function Thread(props)
{
    const username = props.thread.username;
    const reply = props.thread.reply;
    const time = props.thread.created_at;
    const location = props.thread.location;
    return (
        <div id="threadReplies">
            <p style={{backgroundColor: "White",borderRadius: "8px", fontFamily:"RobotoCondensed", marginTop:"1vh",marginLeft:"10px",marginRight:"10px",marginBottom:"1vh",maxHeight:"fit-content"}}>{reply}</p>
            <div style={{display: "grid", gridTemplateRows: "2fr 1fr 1fr"}}>
                <p style={{backgroundColor:"white", borderRadius:"8px", margin:"1vh 1vh 1vh 1vh"}}>{time}</p>
                <p style={{backgroundColor:"white", borderRadius:"8px", margin:"1vh 1vh 1vh 1vh"}}>{location}</p>
                <button className="btnn clean">{username}</button>
            </div>
        </div>
    )
}