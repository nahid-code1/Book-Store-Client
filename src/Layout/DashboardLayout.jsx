import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi2";
import useRole from '../assets/hooks/useRole';

const DashboardLayout = () => {
    const { role, isLoading } = useRole();

    if (isLoading) {
        return <p>loading...</p>;
    }

    return (
        <div className="drawer lg:drawer-open">
            {/* Drawer toggle */}
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Drawer content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label
                        htmlFor="my-drawer-4"
                        className="btn btn-square btn-ghost"
                    >
                        ☰
                    </label>
                    <div className="px-4">Dashboard</div>
                </nav>

                {/* Page content */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="w-64 bg-base-200 p-4">
                    <ul className="menu gap-4">
                        <li><Link to="/">Homepage</Link></li>

                        {role === 'user' && (
                            <>
                                <li>
                                    <Link to="/dashboard/my-orders">
                                        <IoBookSharp /> My Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/invoices">
                                        <FaFileInvoiceDollar /> Invoices
                                    </Link>
                                </li>
                            </>
                        )}

                        {role === 'librarian' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-books">
                                        <IoBookSharp /> Add Books
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/orders">
                                        <IoBookSharp /> Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-books">
                                        <IoBookSharp /> My Books
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <HiOutlineUsers /> Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/all-books">
                                        <IoBookSharp /> All Books
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/dashboard/my-profile">
                                <CgProfile /> My Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default DashboardLayout;