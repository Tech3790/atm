import React from "react";
import "./Home.sass";
import atmPicture from "../../assets/atm.png";
import Header from "../header/Header";
const Home = () => (
  <div>
    <Header />
    <div className="aboutContainer">
      <h2 className="title">About this app</h2>
      <hr className="hr" />
      <p className="projectDescription">
        With this app you can simply add a user to the bank system and give them
        an initial balance.
      </p>
      <p className="projectDescription">
        You can also make a deposit or withdraw money, but be carefull! if you
        exceed your daily limit of $300 you will have to wait 24 hours before
        you can make another withdraw.
      </p>
      <p className="projectDescription">Enjoy!</p>
      <img src={atmPicture} className="atmPicture" alt="atm" />
    </div>
  </div>
);

export default Home;
