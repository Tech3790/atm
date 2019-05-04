import React from "react";
import "./Register.sass";

const Register = () => (
  <div className="registrationContainer">
    <form className="registerForm">
      <h2 className="formTitle">Register</h2>
      <div>
        <input className="textField" type={Text} placeholder="First Name" />
        <input className="textField" type={Text} placeholder="Last Name" />
        <input className="textField" type={Text} placeholder="Email Address" />
      </div>
      <div>
        <input
          className="textField"
          type="text"
          placeholder="16 digits number.."
        />
        <input type="password" className="textField" placeholder="PIN" />
        <input type="password" className="textField" placeholder="Repeat PIN" />
      </div>
      <button type="submit" className="submitButton">
        Submit
      </button>
    </form>
  </div>
);

export default Register;
