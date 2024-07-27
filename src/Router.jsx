import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Layout from './Layout/Layout'
import Error from './Error'
import Create from './Project/Create'
import Prjoects from './Project/Prjoects'
import SignIn from './Auth/SIgnIn'
import SignUp from './Auth/SignUp'
import ProtectedRoute from './Auth/ProtectedRoute'

const router = createBrowserRouter([{

  path: "/layout",
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
  errorElement: <Error />,
  children: [
    {
      path: "/layout/dashboard",
      element:
        <Dashboard />
    },
    {
      path: "/layout/create",
      element:
        <Create />
    },
    {
      path: "/layout/projects",
      element: <Prjoects />
    }
  ]
},
{
  path: "/",
  element: <SignIn />
},
{
  path: "/signup",
  element: <SignUp />
}])
export default router
