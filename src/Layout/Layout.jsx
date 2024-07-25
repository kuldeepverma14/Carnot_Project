import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

function Layout() {
    return (
        <>
            <div className="flex flex-row ">
                <div className="">
                    <Sidebar />
                </div>
                <div className="flex-1 bg-red-400">
                    <div className="">
                        <Topbar />
                    </div>
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout