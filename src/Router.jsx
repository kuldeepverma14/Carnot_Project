import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Home from './Home/Home'
import Layout from './Layout/Layout'
import Error from './Error'


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
      path: "/home",
      element: <Home />
    }
  ]
}])
export default router
