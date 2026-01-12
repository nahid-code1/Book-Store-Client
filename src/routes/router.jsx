import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Books from "../pages/Books/Books";
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrders from "../pages/Dashbaord/MyOrders";
import MyProfile from "../pages/Dashbaord/MyProfile";
import Invoices from "../pages/Dashbaord/Invoices";
import Payment from "../pages/Dashbaord/Payment/Payment";
import PaymentSuccess from "../PaymentSuccess";
import PaymentCancelled from "../PaymentCancelled";
import Users from "../pages/Dashbaord/Users";
import AdminRoute from "./Admin Route/AdminRoute";
import AllBooks from "../pages/Dashbaord/AllBooks";
import LibrarianRoute from "./Admin Route/LibrarianRoute";
import AddBook from "../pages/Dashbaord/AddBook";
import Orders from "../pages/Dashbaord/Orders";
import MyBooks from "../pages/Dashbaord/MyBooks";
import BookDetails from "../pages/Books/BookDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardOverview from "../pages/Dashbaord/DashboardOverview";


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
                element: <Books />,
            },
            {
                path: 'books/:id',
                element: <PrivateRoute><BookDetails /></PrivateRoute>,
            },
            {
                path: 'about',
                Component: About,
            },
            {
                path: 'contact',
                Component: Contact,
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardOverview,
            },
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
                path: 'users',
                element: <AdminRoute><Users /></AdminRoute>
            },
            {
                path: 'all-books',
                element: <AdminRoute><AllBooks /></AdminRoute>
            },
            {
                path: 'add-books',
                element: <LibrarianRoute><AddBook /></LibrarianRoute>
            },
            {
                path: 'orders',
                element: <LibrarianRoute><Orders /></LibrarianRoute>
            },
            {
                path: 'my-books',
                element: <LibrarianRoute><MyBooks /></LibrarianRoute>
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
