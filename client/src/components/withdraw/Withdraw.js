import React, { Component } from "react";
import "./Withdraw.sass";
import Header from '../header/Header'
export default class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        <div className="withdrawContainer">
          <form className="withdrawForm">
            <h2 className="formTitle">Withdraw</h2>
            <div>
              <input
                className="textField"
                type="text"
                placeholder="Card Number"
              />
              <input className="textField" type="password" placeholder="PIN" />
              <input className="textField" type="number" placeholder="Amount" />
            </div>
            <button type="submit" className="submitButton">
              Withdraw
            </button>
            <p className="successMessage">
              you have successfully withdrawn $20.00 your remaining balance is
              3587.76
            </p>
            <p className="errorMessage">
              Unable to complete transaction, insufficiente balance or daily
              limit exceeded
            </p>
          </form>
        </div>
      </div>
    );
  }
}
