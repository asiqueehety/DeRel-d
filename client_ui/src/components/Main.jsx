import React, { useState } from "react";
import NavBar from "./NavBar";
import MiddlePane from "./MiddlePane"
import LeftPane from "./Leftpane";
import RightPane from "./Rightpane";
import CreateTopic from "./CreateTopic";
import FollowingTopics from "./FollowingTopics";
import OngoingPcp from "./OngoingPcp";
import Hashtags from "./Hashtags";
import Communities from "./Communities";
import LiveDebates from "./LiveDebates";


export default function Main(props)
{
    const [activeView, setActiveView] = useState("home");



    function renderMiddlePane() {
      
      if (activeView === "home") {return <MiddlePane />;}
      if (activeView === "createtopic") {return <CreateTopic />;}
      if (activeView === "followingtopics") {return <FollowingTopics />;}
      if (activeView === "ongoingpcp") {return <OngoingPcp />;}
      if (activeView === "hashtags") {return <Hashtags />;}
      if (activeView === "communities") {return <Communities />;}
      if (activeView === "livedebates") {return <LiveDebates />;}
      // add other views later if needed
      return <MiddlePane />;
    }

    return (
        <div>
            <NavBar />
            <div id="PaneStyler">
                <LeftPane setActiveView={setActiveView} />
                {renderMiddlePane()}
                <RightPane />
            </div>
        </div>
    )
}