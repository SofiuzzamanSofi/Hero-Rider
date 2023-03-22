import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import HomeDetails from "../pages/Home/HomeDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import PrivetRoute from "./PrivetRoute";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <HomeDetails />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <PrivetRoute><Register /></PrivetRoute>
            },
        ]
    }
]);
export default route;