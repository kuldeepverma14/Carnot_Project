/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import logo1 from "../assets/Logo1.png";
import { CgMenuBoxed } from 'react-icons/cg';

function Topbar({ setSidebarHandler, sidebarhandler, setSidebarHandlerMobile, sidebarhandlerMobile }) {
  return (
    <div className='h-20 flex justify-between lg:justify-start lg:items-center shadow-lg p-4'>
      <div className='flex items-center'>
        <img className='' width={150} src={logo1} alt="logo not found" />
      </div>
      <div className='flex items-center'>
        <button 
          className='ml-10 flex-none w-20 lg:block hidden' 
          onClick={() => setSidebarHandler(!sidebarhandler)}
        >
          <CgMenuBoxed className='text-[#38C0E6]' size={30} />
        </button>
        <button 
          className=' flex-none w-20 lg:hidden' 
          onClick={() => setSidebarHandlerMobile(!sidebarhandlerMobile)}
        >
          <CgMenuBoxed className='text-[#38C0E6]' size={30} />
        </button>
      </div>
      <nav className="hidden lg:flex flex-1">
        <NavLink 
          className="" 
          to="/layout/dashboard" 
          end 
          style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}
        >
          Dashboard &nbsp; / &nbsp;
        </NavLink>
        <NavLink 
          className="" 
          to="/layout/create" 
          style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}
        >
          Create Project &nbsp; / &nbsp;
        </NavLink>
        <NavLink 
          className="" 
          to="/layout/projects" 
          style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}
        >
          Projects
        </NavLink>
      </nav>
    </div>
  );
}

export default Topbar;
