import React from "react";

export default function LeftPane({ setActiveView })
{
    return(
        <div id="leftPane">
            <button className="btnn clean" onClick={() => setActiveView("home")}>Home</button>
            <button className="btnn clean" onClick={() => setActiveView("createtopic")}>+ Create Topic</button>
            <button className="btnn clean" onClick={() => setActiveView("followingtopics")}>Following topics</button>
            <button className="btnn clean" onClick={() => setActiveView("ongoingpcp")}>Ongoing participations</button>
            <button className="btnn clean" onClick={() => setActiveView("hashtags")}>Hashtags</button>
            <button className="btnn clean" onClick={() => setActiveView("communities")}>Debating Communities</button>
            <button className="btnn clean" onClick={() => setActiveView("livedebates")}>Live Debates</button>
        </div>
    )
}