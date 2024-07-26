import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { CiCircleList } from 'react-icons/ci';
import { GoSignOut } from 'react-icons/go';

function Sidebar({ sidebarhandler }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'px-2 py-1 hover:px-2 hover:py-1 flex gap-2 bg-[#38C0E6] text-white rounded-lg'
      : 'px-2 py-1 hover:px-2 hover:py-1 flex gap-2 hover:bg-[#38C0E6] hover:text-white hover:rounded-lg';
  };
const SignOutUser=()=>{
  localStorage.removeItem('accessToken');
          navigate('/signin');
}
  return (
    <>
      {/* <div className='lg:block hidden shadow-lg h-full'> */}
      <div className={`w-52 fixed  lg:block hidden  left-0 h-full shadow-lg bg-white z-50 transform transition-transform duration-500 ease-in-out ${sidebarhandler ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className='p-4 '>
          <div className='py-2 px-2'>
            <Link to="/" className={getLinkClass('/')}>
              <button><MdOutlineDashboardCustomize size={20} /></button>
              <button className="text-nowrap">Dashboard</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/create" className={getLinkClass('/create')}>
              <button><IoCreateOutline size={20} /></button>
              <button className=' text-nowrap'>Create Project</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/projects" className={getLinkClass('/projects')}>
              <button><CiCircleList size={20} /></button>
              <button className=' text-nowrap'>Projects</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link  onClick={SignOutUser} className={getLinkClass('/signout')}>
              <button><GoSignOut size={20} /></button>
              <button className=' text-nowrap'>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile sidebar */}
      {/* <div className='lg:hidden shadow-lg h-full'> */}
      <div className={`fixed lg:hidden overflow-x-hidden left-0 h-full shadow-lg bg-white z-50  transform transition-transform duration-300 ease-in-out ${!sidebarhandler ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-4 '>
          <div className='py-2 px-2'>
            <Link to="/" className={getLinkClass('/')}>
              <button><MdOutlineDashboardCustomize size={20} /></button>
              <button className=' text-nowrap'>Dashboard</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/create" className={getLinkClass('/create')}>
              <button><IoCreateOutline size={20} /></button>
              <button className=' text-nowrap'>Create Project</button>
            </Link>
          </div>
          <div className='py-2 px-2'>
            <Link to="/projects" className={getLinkClass('/projects')}>
              <button><CiCircleList size={20} /></button>
              <button className=' text-nowrap'>Projects</button>
            </Link>
          </div>
          {/* <div className='py-2 px-2'>
            <Link to="/signout" className={getLinkClass('/signout')}>
              <button><GoSignOut size={20} /></button>
              <button className=' text-nowrap'>Sign Out</button>
            </Link>
          </div> */}
          <div className='py-2 px-2'>
            <Link to="/signout" onClick={SignOutUser} className={getLinkClass('/signout')}>
              <button><GoSignOut size={20} /></button>
              <button className=' text-nowrap'>Sign Out</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
