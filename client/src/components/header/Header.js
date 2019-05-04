import "./Header.sass";
import githubIcon from "../../assets/icons/Octocat.png";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = {
      redirect: false,
      redirectPath: ""
    };
  }

  handleRedirect(path) {
    this.setState({ redirectPath: path });
    this.setState({ redirect: true }, () => {
      this.setState({ redirect: false });
    });
  }

  render() {
    return this.state.redirect === true ? (
      <Redirect to={this.state.redirectPath} />
    ) : (
      <div>
        <div className="container">
          <p className="title">Welcome to the ATM simulator</p>
          <div className="navbar">
            <div className="link" onClick={() => this.handleRedirect("/")}>
              Home
            </div>
            <div
              className="link"
              onClick={() => this.handleRedirect("/addusers")}
            >
              Add Users
            </div>
            <div
              className="link"
              onClick={() => this.handleRedirect("/withdraw")}
            >
              Withdraw
            </div>
            <div
              className="link"
              onClick={() => this.handleRedirect("/deposit")}
            >
              Deposit
            </div>
          </div>
          <div className="iconContainer">
            <a href="https://github.com/Tech3790/atm" className="iconLink">
              <img src={githubIcon} alt="github" className="githubIcon" />
              <p className="checkRepo">Check this Repo on GitHub</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
