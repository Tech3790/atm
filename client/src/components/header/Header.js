import React from "react";
import "./Header.sass";
import githubIcon from "../../assets/icons/Octocat.png";

const Header = () => (
  <div className="container">
    <p className="title">Welcome to the ATM simulator</p>
    <nav className="navbar">
      <a className="link" href="/">
        Home
      </a>
      <a className="link" href="/addusers">
        Add Users
      </a>
      <a className="link" href="/withdraw">
        Withdraw
      </a>
      <a className="link" href="/deposit">
        Deposit
      </a>
    </nav>
    <div className="iconContainer">
      <a href="https://github.com/Tech3790/atm" className="iconLink">
        <img src={githubIcon} alt="github" className="githubIcon" />
        <p className="checkRepo">Check this Repo on GitHub</p>
      </a>
    </div>
  </div>
);

export default Header;
