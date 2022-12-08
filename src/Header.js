import React from 'react'
import './Header.css';
import logo_img from './assets/logo.png'
import { useNavigate } from 'react-router-dom';

const EmpID = localStorage.getItem('EmpID');
function Header() {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/auth');
    localStorage.removeItem('EmpID');
  }
  if (localStorage.getItem('EmpID'))
    return (
      <div className="Header">
              <img className="logo_img" src={logo_img} />
            <h1 className='title'>Employee Goal Manager</h1>
            <button className='logout' onClick={logout}>Logout</button>
        </div>
    )
  else
    return (
      <div className="Header">
              <img className="logo_img" src={logo_img} />
            <h1>Employee Goal Manager</h1>
        </div>
    )
}

export default Header