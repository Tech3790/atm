import React, { Component } from "react";
import "./Deposit.sass";
import Header from "../header/Header";
import axios from "axios";

export default class Deposit extends Component {
  constructor(props) {
    super(props);
    this.depositForm = React.createRef();
    this.state = {
      cardNumber: "",
      PIN: "",
      amount: "",
      formErrors: [],
      successMessage: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formErrors: [],
      successMessage: ""
    });
  };

  validateCardNumber = () => {
    let error = "Invalid Card Number please enter 16 digits";
    let { cardNumber } = this.state;
    if (cardNumber.length === 16) {
      return true;
    } else if (!this.state.formErrors.includes(error)) {
      this.setState(
        {
          formErrors: [...this.state.formErrors, error]
        },
        () => false
      );
    }
    return false;
  };

  validatePin = () => {
    let error = "PIN has to be 4 digits";
    let { PIN } = this.state;

    if (PIN.length === 4) {
      return true;
    } else if (!this.state.formErrors.includes(error)) {
      this.setState(
        { formErrors: [...this.state.formErrors, error] },
        () => false
      );
    }
    return false;
  };

  validateAmount = () => {
    let error = "Amount has to be more than 0";
    if (parseInt(this.state.amount) > 0 && this.state.amount.length !== 0) {
      return true;
    } else if (!this.state.formErrors.includes(error)) {
      this.setState(
        {
          formErrors: [...this.state.formErrors, error]
        },
        () => false
      );
    }
    return false;
  };

  validateForm = async () => {
    let validCardNumber = await this.validateCardNumber();
    let validPin = await this.validatePin();
    let validAmount = await this.validateAmount();

    return validCardNumber && validPin && validAmount;
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (await this.validateForm()) {
      let { cardNumber, amount, PIN } = this.state;
      let depositData = { cardNumber, amount, PIN };
      axios
        .post("http://localhost:8080/accounts/deposit", depositData)
        .then(() => this.setState({ successMessage: "Transaction succeeded" }))
        .catch(error =>
          this.setState({
            formErrors: [
              ...this.state.formErrors,
              "Unable to deposit, check card number and PIN"
            ]
          })
        );
      this.resetForm();
    }
  };

  resetForm = () => {
    this.depositForm.current.reset();
    this.setState({
      cardNumber: "",
      PIN: "",
      amount: "",
      formErrors: []
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="depositContainer">
          <form className="depositForm" ref={this.depositForm}>
            <h2 className="formTitle">Deposit</h2>
            <div>
              <input
                className="textField"
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                onChange={this.handleChange}
              />
              <input
                className="textField"
                type="password"
                placeholder="PIN"
                maxLength="4"
                name="PIN"
                onChange={this.handleChange}
              />
              <input
                className="textField"
                type="number"
                placeholder="Amount"
                name="amount"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="submitButton"
              onClick={this.handleSubmit}
            >
              Deposit
            </button>
            <p className="successMessage">{this.state.successMessage}</p>
            <ul className="errorsList">
              {this.state.formErrors.map((error, i) => (
                <li key={i} className="error">
                  {error}
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
