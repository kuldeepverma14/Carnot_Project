import { Link } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { IoCreateOutline } from 'react-icons/io5'
import { CiCircleList } from 'react-icons/ci'
import { GoSignOut } from 'react-icons/go'
function Sidebar({sidebarhandler}) {
  return (
    <>
      <div className=' shadow-lg h-screen '  >
        
        <div className='py-2 px-5' >
          <div className='py-2 px-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg'>
            <Link to="/" className='flex gap-2' >
              <button><MdOutlineDashboardCustomize size={25} /> </button>
              <button className=' text-lg'>Dashboard</button>
            </Link>
          </div>
          <div className='py-2 px-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg'>
            <Link to="/create" className='flex gap-2'  >
              <button><IoCreateOutline size={25} /></button>
              <button className=' text-lg'> Create Project</button>
            </Link>
          </div>
          <div className='py-2 px-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg'>
            <Link to="/projects" className='flex gap-2'  >
              <button><CiCircleList size={25} /></button>
              <button className=' text-lg' > Projects</button>
            </Link>
          </div>
          <div className='py-2 px-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg'>
            <Link to="/projects" className='flex gap-2'  >
              <button><GoSignOut size={25} /></button>
              <button className=' text-lg' > Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar