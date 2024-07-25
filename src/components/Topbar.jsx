import React from 'react'
import logo from "../assets/Logo.png"

function Topbar({ setSidebarHandler }) {
  return (
    <div className='flex flex-1 shadow-sm '>
      <div className='py-2 px-5 '>
        <img width={150} src={logo} alt="logo not found" />
      </div>
      <button onClick={() => setSidebarHandler(false)} >close</button>
      <button onClick={() => setSidebarHandler(true)} >open</button>
    </div>
  )
}

export default Topbar