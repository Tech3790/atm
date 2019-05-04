import React, { Component } from "react";
import "./Deposit.sass";
import Header from '../header/Header'

export default class Deposit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div className="depositContainer">
          <form className="depositForm">
            <h2 className="formTitle">Deposit</h2>
            <div>
              <input
                className="textField"
                type="text"
                placeholder="Card Number"
              />
              <input
                className="textField"
                type="password"
                placeholder="PIN"
                maxLength="4"
              />
              <input className="textField" type="number" placeholder="Amount" />
            </div>
            <button type="submit" className="submitButton">
              Deposit
            </button>
            <p className="successMessage">
              you have successfully deposited $20.00 your new balance is 3587.76
            </p>
            <p className="errorMessage">Please enter a valid amout</p>
          </form>
        </div>
      </div>
    );
  }
}
