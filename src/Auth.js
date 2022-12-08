import React, {useState} from "react";
import welcome from './assets/welcome_img.png';
import { useNavigate } from "react-router-dom";

export default function (props) {
  let navigate = useNavigate(); 
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const setUser = (usr) => {
    setUsername(usr.target.value);
  }
  const setPass = (usr) => {
    setPassword(usr.target.value);
  }

  const setCookieFunction = (value) => {
    localStorage.setItem('EmpID', value)
  }

  const loggedIn = () => {
    if(localStorage.getItem('EmpID')){
      navigate('/view');
    }
  }

  return (
    <div className="Auth-form-container" onLoad={loggedIn}>
      <img className="welcome_img" src={welcome} />
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter username"
              value={username}
              onChange={setUser} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={setPass} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={async () => {
              const response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                body: JSON.stringify({ email: username, password: password }),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              });
              response.json().then((data) => {
                try {
                  if (data[0].EmpID) {
                    setCookieFunction(data[0].EmpID);
                    console.log("authen");
                    navigate('/view');
                  }
                }
                catch {
                  console.log("wrong login");
                  alert("Wrong Password!");
                }
              });
            } }>
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