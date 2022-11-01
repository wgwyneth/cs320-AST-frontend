import React from "react";
import welcome from './assets/welcome_img.png';
import  { redirect } from 'react-router-dom'

async function login() {
  var username = "Gerald_Cunningham@fluffybunnyconsulting.com";
  var password = "cunninghamge"; 
  const response = await fetch('http://localhost:9000/api/login', {
    method: 'POST',
    body: JSON.stringify({email: username, password: password}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  response.json().then((jsonObj) => console.log(jsonObj));
}

export default function (props) {
  return (
    <div className="Auth-form-container">
         <img className="welcome_img" src={welcome}/>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={login()}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot password? Contact admin.
          </p>
        </div>
      </form>
    </div>
  )
}