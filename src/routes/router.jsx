import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Books from "../pages/Books/Books";
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrders from "../pages/Dashbaord/MYOrders";
import MyProfile from "../pages/Dashbaord/MyProfile";
import Invoices from "../pages/Dashbaord/Invoices";
import Payment from "../pages/Dashbaord/Payment/Payment";
import PaymentSuccess from "../PaymentSuccess";
import PaymentCancelled from "../PaymentCancelled";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'books',
                element: <PrivateRoute><Books></Books></PrivateRoute>,
            },
        ]
    },
    {
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
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'my-orders',
                Component: MyOrders,
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'invoices',
                Component: Invoices,
            },
            {
                path: 'payment/:orderId',
                Component: Payment,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled,
            }
        ]
    }
]);