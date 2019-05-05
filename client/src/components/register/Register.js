import React, { Component } from "react";
import "./Register.sass";
import Header from "../header/Header";
import axios from "axios";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      initialBalance: "",
      cardNumber: "",
      PIN: "",
      rePIN: "",
      formErrors: []
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, formErrors: [] });
  };

  validateName = () => {
    let nameErrors = [];
    var regName = /^[a-zA-Z]+$/;
    if (!regName.test(this.state.firstname)) {
      nameErrors.push("you have entered an invalid first name");
    }
    if (!regName.test(this.state.lastname)) {
      nameErrors.push("you have entered an invalid last name");
    }
    if (nameErrors.length !== 0) {
      this.setState(
        { formErrors: [...this.state.formErrors, ...nameErrors] },
        () => false
      );
    } else {
      return true;
    }
  };
  validateInitialBalance = () => {
    let { initialBalance } = this.state;
    if (parseFloat(initialBalance) >= 100) {
      return true;
    } else {
      this.setState(
        {
          formErrors: [
            ...this.state.formErrors,
            "Initial balance has a minimum of $100"
          ]
        },
        () => false
      );
    }
  };
  validateCardNumber = () => {
    let { cardNumber } = this.state;
    if (cardNumber.length === 16) {
      return true;
    } else {
      this.setState(
        {
          formErrors: [
            ...this.state.formErrors,
            "Invalid Card Number please enter 16 digits"
          ]
        },
        () => false
      );
    }
  };
  validatePin = () => {
    let pinErrors = [];
    if (this.state.PIN.length !== 4) {
      pinErrors.push("PIN has to be 4 digits");
    }
    if (this.state.PIN !== this.state.rePIN) {
      pinErrors.push("PIN fields do not match");
    }
    if (pinErrors.length === 0) {
      return true;
    } else {
      this.setState(
        { formErrors: [...this.state.formErrors, ...pinErrors] },
        () => false
      );
    }
  };

  validateForm = async () => {
    let validName = await this.validateName();
    let validCardNumber = await this.validateCardNumber();
    let validPin = await this.validatePin();
    let validInitialBalance = await this.validateInitialBalance();
    return validName && validCardNumber && validPin && validInitialBalance;
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (await this.validateForm()) {
      let { firstname, lastname, initialBalance, cardNumber, PIN } = this.state;
      let userData = {firstname, lastname, initialBalance, cardNumber, PIN};
      axios.post("http://localhost:8080/users/createUser", userData);
    } else {
      console.log(this.state.formErrors);
    }
  };
  render = () => (
    <div>
      <Header />
      <div className="registrationContainer">
        <form className="registerForm">
          <h2 className="formTitle">Register</h2>
          <div>
            <input
              name="firstname"
              className="textField"
              type="text"
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <input
              name="lastname"
              className="textField"
              type="text"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="initialBalance"
              type="number"
              className="textField"
              placeholder="Initial Balance"
              onChange={this.handleChange}
            />
            <input
              name="cardNumber"
              className="textField"
              type="number"
              placeholder="Enter 16 digits number"
              onChange={this.handleChange}
            />
            <input
              type="password"
              className="textField"
              placeholder="PIN"
              name="PIN"
              onChange={this.handleChange}
            />
            <input
              name="rePIN"
              type="password"
              className="textField"
              placeholder="Re-Enter PIN"
              onChange={this.handleChange}
            />
          </div>
          <ul className="errorsList">
            {this.state.formErrors.map((error, i) => (
              <li key={i} className="err">
                {error}
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="submitButton"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
