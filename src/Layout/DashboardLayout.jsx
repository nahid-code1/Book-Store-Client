import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IoBookSharp, IoStatsChart } from "react-icons/io5";
import { FaFileInvoiceDollar, FaPlus, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import useRole from '../assets/hooks/useRole';

const DashboardLayout = () => {
    const { role, isLoading } = useRole();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Drawer content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <nav className="navbar bg-base-200 shadow-sm sticky top-0 z-40">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-4"
                            className="btn btn-square btn-ghost"
                            aria-label="Open menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </div>
                    <div className="flex-none">
                        <Link to="/" className="btn btn-ghost">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                {/* Page content */}
                <main className="flex-1 p-6 bg-base-100">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <aside className="w-64 min-h-full bg-base-200">
                    <div className="p-4">
                        <div className="text-center mb-6">
                            <h2 className="text-lg font-bold">Book Courier</h2>
                            <p className="text-sm text-base-content/70 capitalize">{role} Dashboard</p>
                        </div>

                        <ul className="menu gap-2">
                            {/* Common Dashboard Link */}
                            <li>
                                <NavLink to="/dashboard" end className="flex items-center gap-3">
                                    <MdDashboard className="text-lg" />
                                    Overview
                                </NavLink>
                            </li>

                            {/* User Menu Items */}
                            {role === 'user' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/my-orders" className="flex items-center gap-3">
                                            <IoBookSharp className="text-lg" />
                                            My Orders
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/invoices" className="flex items-center gap-3">
                                            <FaFileInvoiceDollar className="text-lg" />
                                            Payment History
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Librarian Menu Items */}
                            {role === 'librarian' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/add-books" className="flex items-center gap-3">
                                            <FaPlus className="text-lg" />
                                            Add Books
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-books" className="flex items-center gap-3">
                                            <MdLibraryBooks className="text-lg" />
                                            My Books
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/orders" className="flex items-center gap-3">
                                            <IoBookSharp className="text-lg" />
                                            Manage Orders
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Admin Menu Items */}
                            {role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/users" className="flex items-center gap-3">
                                            <FaUsers className="text-lg" />
                                            Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/all-books" className="flex items-center gap-3">
                                            <MdLibraryBooks className="text-lg" />
                                            All Books
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/analytics" className="flex items-center gap-3">
                                            <IoStatsChart className="text-lg" />
                                            Analytics
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            <div className="divider"></div>

                            {/* Profile Link */}
                            <li>
                                <NavLink to="/dashboard/my-profile" className="flex items-center gap-3">
                                    <CgProfile className="text-lg" />
                                    My Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};


export default DashboardLayout;