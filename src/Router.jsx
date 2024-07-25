import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Home from './Project/Create'
import Layout from './Layout/Layout'
import Error from './Error'
import Create from './Project/Create'
import Prjoects from './Project/Prjoects'


const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/projects",
      element: <Prjoects />
    }
  ]
}])
export default router
