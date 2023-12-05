import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import './rootLayout.css'

const RootLayout = () => {
  return (
    <div className="main-content">
      <Navbar/>
      <img src="/main-bg.jpg" alt="background-image" />
      <div className="content-area">
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout