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
import Profile from "./Profile";


export default function Main(props)
{
    const [activeView, setActiveView] = useState("home");
    const [activePage, setActivePage] = useState("home");



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

    function renderPage() {
        switch (activePage) {
            case "home":
                return(
                    <>
                        <LeftPane setActiveView={setActiveView} />
                        <div id="MiddlePaneStyler">
                            {renderMiddlePane()}
                        </div>
                        <RightPane />
                    </>
                )
            case "profile":
                return(
                    <Profile />
                )

            default:
                return(
                    <>
                        <LeftPane setActiveView={setActiveView} />
                        {renderMiddlePane()}
                        <RightPane />
                    </>
                )
        }
    }

    return (
        <div>
            <NavBar setActivePage={setActivePage}/>
            <div id="PaneStyler">
                {renderPage()}
            </div>
        </div>
    )
}