import React from "react";
import Navbartitle from "./Navbar-title";
export default function NavBar() {
    return (
        <nav className="navBar">
            <Navbartitle />
            <div id="navBarRight">
                <form style={{display:"grid",gridTemplateColumns:"2fr 1fr",marginBottom:"20px"}}>
                    <input className="inputBar" placeholder="Search"/>
                    <button id="searchBtn" className="btnn hacker"><img src="/resources/magnifying-glass.png" alt="" /></button>
                </form>
                <div id="navBarBtn">
                    <button className="btnn hacker BtnTxt">Trending</button>
                    <button className="btnn hacker BtnTxt">Topics</button>
                    <button className="btnn hacker BtnTxt">Learn</button>
                    <button className="btnn hacker BtnTxt"><img src="/resources/user.png" alt="User Profile Button" /></button> 
                </div>
                
            </div>
        </nav>
    );
  }
  