import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Root from "../Root/Root";
import Home from "../Home/Home";
import ErrorPage from "../pages/ErrorePage/ErrorPage";
import Contract from "../pages/Contract/Contract";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <PrivateRoute><Home></Home> </PrivateRoute>
        },
        
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path:'/register',
          element: <Register></Register>
        },
        {
          path:'/contract',
          element:<Contract></Contract>
        }
       
      ]
    },
  ]);

  export default router;