import React from 'react'
import './Header.css';
import logo_img from './assets/logo_img.png'

const EmpID = localStorage.getItem('EmpID');
console.log(EmpID);

function Header() {
  return (
    <div className="Header">
            {/* if (loggedIn) {
                <></>
            } */}
            <img className="logo_img" src={logo_img} />
          <h1>Employee Goal Manager</h1>
      </div>
  )
}

export default Header