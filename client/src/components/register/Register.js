import React, { Component } from "react";
import "./Register.sass";
import Header from '../header/Header'
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div className="registrationContainer">
          <form className="registerForm">
            <h2 className="formTitle">Register</h2>
            <div>
              <input
                className="textField"
                type="text"
                placeholder="First Name"
              />
              <input
                className="textField"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <input
                type="number"
                className="textField"
                placeholder="Initial Balance"
              />

              <input
                className="textField"
                type="number"
                placeholder="Enter 16 digits number"
              />
              <input type="password" className="textField" placeholder="PIN" />
              <input
                type="password"
                className="textField"
                placeholder="Re-Enter PIN"
              />
            </div>
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
