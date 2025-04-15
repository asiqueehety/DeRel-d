import React from "react";
import NavBar from "./NavBar";
import MiddlePane from "./MiddlePane"
import LeftPane from "./Leftpane";
import RightPane from "./Rightpane";

export default function App()
{
    return (
        <div>
            <NavBar />
            <div id="PaneStyler">
                <LeftPane />
                <MiddlePane />
                <RightPane />
            </div>
        </div>
    )
}