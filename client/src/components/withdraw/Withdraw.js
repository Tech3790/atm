import React, { Component } from "react";
import "./Withdraw.sass";
import Header from "../header/Header";
export default class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.withdrawForm = React.createRef();
    this.state = {
      cardNumber: "",
      PIN: "",
      amount: "",
      formErrors: [],
      successMessage: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, formErrors: [] });
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
    let error = "Amount has to be more than $0 and a multiple of $20";
    let amountEntered = parseInt(this.state.amount);
    if (
      amountEntered > 0 &&
      amountEntered.length !== 0 &&
      amountEntered % 20 === 0
    ) {
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

  resetForm = () => {
    this.withdrawForm.current.reset();
    this.setState({ successMessage: "Transaction succeeded please take you money and your receipt" }, () =>
      this.setState({
        cardNumber: "",
        PIN: "",
        amount: "",
        formErrors: []
      })
    );
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (await this.validateForm()) {
      let { cardNumber, PIN, amount } = this.state;
      let withdrawData = { cardNumber, PIN, amount };
      // axios.post("http://localhost:8080/users/createUser", depositData);
      this.resetForm();
      console.log(withdrawData);
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="withdrawContainer">
          <form className="withdrawForm" ref={this.withdrawForm}>
            <h2 className="formTitle">Withdraw</h2>
            <div>
              <input
                name="cardNumber"
                className="textField"
                type="text"
                placeholder="Card Number"
                onChange={this.handleChange}
              />
              <input
                name="PIN"
                maxLength="4"
                className="textField"
                type="password"
                placeholder="PIN"
                onChange={this.handleChange}
              />
              <input
                name="amount"
                className="textField"
                type="number"
                placeholder="Amount"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="submitButton"
              onClick={this.handleSubmit}
            >
              Withdraw
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
