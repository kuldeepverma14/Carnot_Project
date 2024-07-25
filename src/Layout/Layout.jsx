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
                    <Topbar setSidebarHandler={setSidebarHandler} />
                </div>
                <div className="flex flex-row">
                    <div className="                                                                                                                                                                                                                                                                                                                                                                                        ">
                        <Sidebar sidebarhandler={sidebarhandler} />
                    </div>
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout