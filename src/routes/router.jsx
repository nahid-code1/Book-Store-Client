import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
        ]
    },
    {
        index: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);