import React, { Component } from "react";
import Header from "../header/Header";
import "./AccountSummary.sass";
import axios from "axios";
import moment from "moment";

export default class AccountSummary extends Component {
  constructor(props) {
    super(props);
    this.showTransactionsForm = React.createRef();
    this.state = {
      cardNumber: "",
      PIN: "",
      transactions: [],
      formErrors: [],
      currentBalance: 0
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      formErrors: []
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

  validateForm = async () => {
    let validCardNumber = await this.validateCardNumber();
    let validPin = await this.validatePin();

    return validCardNumber && validPin;
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (await this.validateForm()) {
      let { cardNumber, PIN } = this.state;
      let showTransactionsData = { cardNumber, PIN };
      axios
        .post(
          "http://localhost:8080/accounts/getTransactions",
          showTransactionsData
        )
        .then(res => {
          this.setState({
            transactions: [...this.state.transactions, ...res.data[0]],
            currentBalance: res.data[1]
          });
        })
        .catch(e => {
          this.setState({
            formErrors: [
              ...this.state.formErrors,
              "user does not exist or incorrect PIN"
            ]
          });
        });
      this.resetForm();
    }
  };

  resetForm = () => {
    this.showTransactionsForm.current.reset();
    this.setState(() =>
      this.setState({
        cardNumber: "",
        PIN: "",
        formErrors: []
      })
    );
  };

  render() {
    return (
      <div>
        <Header />
        <div className="formContainer">
          <form className="accountSummaryForm" ref={this.showTransactionsForm}>
            <p className="formTitle">Account Summary and Transactions</p>
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
            <button
              type="submit"
              className="showTransactions"
              onClick={this.handleSubmit}
            >
              Show Balance and Transactions
            </button>
            <p className="currentBalance">
              {`Your current balance is: $${this.state.currentBalance}`}
            </p>
            <ul className="errorsList">
              {this.state.formErrors.map((error, i) => (
                <li key={i} className="error">
                  {error}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div
          className={
            this.state.transactions.length === 0
              ? "hidden"
              : "transactionsContainer"
          }
        >
          <div
            className={
              this.state.transactions.length === 0
                ? "hidden"
                : "tableHeadersContainer"
            }
          >
            <p
              hidden={this.state.transactions.length === 0 ? true : false}
              className="tableHeader"
            >
              Type
            </p>
            <p
              hidden={this.state.transactions.length === 0 ? true : false}
              className="tableHeader"
            >
              Amount{" "}
            </p>
            <p
              hidden={this.state.transactions.length === 0 ? true : false}
              className="tableHeader"
            >
              Date
            </p>
          </div>
          {this.state.transactions.map((transaction, key) => (
            <div className="transactionRow" key={key}>
              <p className="transactionItem">{transaction.type}</p>
              <p className="transactionItem">${transaction.amount}</p>
              <p className="transactionItem">
                {moment(transaction.created_at)
                  .startOf()
                  .fromNow()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
