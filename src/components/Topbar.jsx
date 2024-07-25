import { NavLink } from "react-router-dom"
import logo1 from "../assets/Logo1.png"
import { CgMenuBoxed } from 'react-icons/cg'

function Topbar({ setSidebarHandler, sidebarhandler }) {
  return (
    <div className='flex items-center  shadow-lg p-4 '>
      <div className=''>
        <img className='' width={150} src={logo1} alt="logo not found" />
      </div>
       <button className='ml-8 flex-none w-20' title='Maximize Sidebar' onClick={() => setSidebarHandler(!sidebarhandler)} ><CgMenuBoxed className='text-[#38C0E6]' size={30} />
      </button>
      <div>
      <nav className="flex-1 ">
        <NavLink className="" to="/" end style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
          Dashboard &nbsp;  / &nbsp;
        </NavLink>
        <NavLink  className="" to="/create" style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
          Create Project  &nbsp;  / &nbsp;
        </NavLink>
        <NavLink  className="" to="/projects" style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
          Projects
        </NavLink>
      </nav>
      </div>
    </div>
  )
}

export default Topbar