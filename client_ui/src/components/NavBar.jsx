import React from "react";
import Navbartitle from "./Navbar-title";
export default function NavBar() {
    return (
        <div>
            <nav className="navBar">
                <Navbartitle />
                <div id="navBarBtn">
                    <button className="btnn hacker"><p className="BtnTxt">Trending</p></button>
                    <button className="btnn hacker"><p className="BtnTxt">Topics</p></button>
                    <button className="btnn hacker"><p className="BtnTxt">Learn</p></button>
                    <form style={{display:"grid",gridTemplateColumns:"2fr 1fr",boxSizing:'content-box'}}>
                        <input className="inputBar" placeholder="Search"/>
                        <button className="btnn hacker"><img src="/resources/magnifying-glass.png" alt="" /></button>
                    </form>
                    <button className="btnn hacker"><img src="/resources/user.png" alt="User Profile Button" /></button> 
                </div>
            </nav>
        </div>
    );
  }
  