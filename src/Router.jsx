import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Layout from './Layout/Layout'
import Error from './Error'
import Create from './Project/Create'
import Prjoects from './Project/Prjoects'
import SignIn from './Auth/SIgnIn'
import SignUp from './Auth/SignUp'
import ProtectedRoute from './Auth/ProtectedRoute'
//  const toke= localStorage.getItem("accessToken")

const router = createBrowserRouter([{

  path: "/",
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/create",
      element: (
        <ProtectedRoute>
          <Create />
        </ProtectedRoute>
      )
    },
    {
      path: "/projects",
      element: (
        <ProtectedRoute>
          <Prjoects />
        </ProtectedRoute>
      )
    }


  ]
}, 
{
  path: "/signin",
  element: <SignIn />
},
{
  path: "/signup",
  element: <SignUp />
}])
export default router
