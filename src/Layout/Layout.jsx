import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useState } from 'react'

function Layout() {
    const [sidebarhandler, setSidebarHandler] = useState(true)
    return (
        <>
            <div className=" ">
                <div className="">
                <Topbar sidebarhandler={sidebarhandler} setSidebarHandler={setSidebarHandler} />
                </div>
                <div className="flex ">
                    <div className={`min-h-screen  `}>
                        <Sidebar sidebarhandler={sidebarhandler} />
                    </div>
                    <div className={`flex-1 w-full transition-all duration-300 ease-in-out ${sidebarhandler ? 'ml-52' : 'ml-0'}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout