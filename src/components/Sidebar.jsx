/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { CiCircleList } from 'react-icons/ci';
import { GoSignOut } from 'react-icons/go';

function Sidebar({ sidebarhandler, sidebarhandlerMobile, setSidebarHandlerMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'px-2 py-1 hover:px-2 hover:py-1 flex gap-2 bg-[#38C0E6] text-white rounded-lg'
      : 'px-2 py-1 hover:px-2 hover:py-1 flex gap-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg';
  };

  const SignOutUser = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`w-52 fixed lg:block hidden left-0 h-[calc(100vh-80px)]  shadow-lg bg-white z-50 transform transition-transform duration-500 ease-in-out ${sidebarhandler ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-4'>
          <div className='py-2 px-2'>
            <Link to="/layout/dashboard" className={getLinkClass('/layout/dashboard')}>
              <button><MdOutlineDashboardCustomize size={20} /></button>
              <button className="text-nowrap">Dashboard</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/layout/create" className={getLinkClass('/layout/create')}>
              <button><IoCreateOutline size={20} /></button>
              <button className='text-nowrap'>Create Project</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/layout/projects" className={getLinkClass('/layout/projects')}>
              <button><CiCircleList size={20} /></button>
              <button className='text-nowrap'>Projects</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link onClick={SignOutUser} className={getLinkClass('/signout')}>
              <button><GoSignOut size={20} /></button>
              <button className='text-nowrap'>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div className={`w-52 fixed block lg:hidden left-0 h-full shadow-lg bg-white z-50 transform transition-transform duration-500 ease-in-out ${sidebarhandlerMobile ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className='p-4'>
          <div className='py-2 px-2'>
            <Link to="/layout/dashboard" onClick={() => setSidebarHandlerMobile(!sidebarhandlerMobile)} className={getLinkClass('/layout/dashboard')}>
              <button><MdOutlineDashboardCustomize size={20} /></button>
              <button className='text-nowrap'>Dashboard</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link onClick={() => setSidebarHandlerMobile(!sidebarhandlerMobile)} to="/layout/create" className={getLinkClass('/layout/create')}>
              <button><IoCreateOutline size={20} /></button>
              <button className='text-nowrap'>Create Project</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link onClick={() => setSidebarHandlerMobile(!sidebarhandlerMobile)} to="/layout/projects" className={getLinkClass('/layout/projects')}>
              <button><CiCircleList size={20} /></button>
              <button className='text-nowrap'>Projects</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link  onClick={SignOutUser} className={getLinkClass('/signout')}>
              <button><GoSignOut size={20} /></button>
              <button className='text-nowrap'>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
