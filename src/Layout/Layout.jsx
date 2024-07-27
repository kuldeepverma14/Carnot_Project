import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useState, useEffect } from 'react'

function Layout() {
    const [sidebarhandler, setSidebarHandler] = useState(true);
    const [sidebarhandlerMobile, setSidebarHandlerMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarHandlerMobile(true);
            } else {
                setSidebarHandler(false)
                setSidebarHandlerMobile(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className=" ">
                <div className="">
                    <Topbar
                        sidebarhandler={sidebarhandler}
                        setSidebarHandler={setSidebarHandler}
                        setSidebarHandlerMobile={setSidebarHandlerMobile}
                        sidebarhandlerMobile={sidebarhandlerMobile}
                    />
                </div>
                <div className="flex  h-[calc(100vh-80px)]">
                    <div className={`  `}>
                        <Sidebar
                            sidebarhandler={sidebarhandler}
                            sidebarhandlerMobile={sidebarhandlerMobile}
                            setSidebarHandlerMobile={setSidebarHandlerMobile}
                        />
                    </div>
                    <div className={`bg-gray-50 flex-1 overflow-y-auto  transition-all duration-300 ease-in-out 
                        ${sidebarhandlerMobile ? 'ml-0' : 'ml-52'} 
                        ${sidebarhandler ? 'ml-52' : 'ml-0'}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;
