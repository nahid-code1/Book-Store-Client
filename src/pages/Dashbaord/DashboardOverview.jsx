import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../assets/hooks/useAuth';
import useRole from '../../assets/hooks/useRole';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';

const DashboardOverview = () => {
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    // Fetch user-specific data based on role
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['dashboard-stats', user?.email, role],
        queryFn: async () => {
            if (role === 'user') {
                const ordersRes = await axiosSecure.get(`/orders?email=${user.email}`);
                const paymentsRes = await axiosSecure.get(`/payments?email=${user.email}`);
                return {
                    totalOrders: ordersRes.data.length,
                    pendingOrders: ordersRes.data.filter(order => order.status === 'pending').length,
                    completedOrders: ordersRes.data.filter(order => order.status === 'delivered').length,
                    totalSpent: paymentsRes.data.reduce((sum, payment) => sum + payment.amount, 0)
                };
            } else if (role === 'librarian') {
                const booksRes = await axiosSecure.get('/books/librarian');
                const ordersRes = await axiosSecure.get('/orders/librarian');
                return {
                    totalBooks: booksRes.data.length,
                    publishedBooks: booksRes.data.filter(book => book.status === 'published').length,
                    totalOrders: ordersRes.data.length,
                    pendingOrders: ordersRes.data.filter(order => order.status === 'pending').length
                };
            } else if (role === 'admin') {
                const usersRes = await axiosSecure.get('/users');
                const booksRes = await axiosSecure.get('/admin/books');
                return {
                    totalUsers: usersRes.data.length,
                    totalBooks: booksRes.data.length,
                    publishedBooks: booksRes.data.filter(book => book.status === 'published').length,
                    librarians: usersRes.data.filter(user => user.role === 'librarian').length
                };
            }
            return {};
        },
        enabled: !!user && !!role
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="skeleton h-8 w-64"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="skeleton h-32 w-full"></div>
                    ))}
                </div>
            </div>
        );
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const renderUserStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value text-primary">{stats.totalOrders || 0}</div>
                <div className="stat-desc">All time orders</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Pending Orders</div>
                <div className="stat-value text-warning">{stats.pendingOrders || 0}</div>
                <div className="stat-desc">Awaiting processing</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div className="stat-title">Completed Orders</div>
                <div className="stat-value text-success">{stats.completedOrders || 0}</div>
                <div className="stat-desc">Successfully delivered</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Spent</div>
                <div className="stat-value text-secondary">৳{stats.totalSpent || 0}</div>
                <div className="stat-desc">On book orders</div>
            </div>
        </div>
    );

    const renderLibrarianStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Books</div>
                <div className="stat-value text-primary">{stats.totalBooks || 0}</div>
                <div className="stat-desc">Books added</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Published Books</div>
                <div className="stat-value text-success">{stats.publishedBooks || 0}</div>
                <div className="stat-desc">Available for sale</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value text-info">{stats.totalOrders || 0}</div>
                <div className="stat-desc">For your books</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Pending Orders</div>
                <div className="stat-value text-warning">{stats.pendingOrders || 0}</div>
                <div className="stat-desc">Need attention</div>
            </div>
        </div>
    );

    const renderAdminStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-primary">{stats.totalUsers || 0}</div>
                <div className="stat-desc">Registered users</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Books</div>
                <div className="stat-value text-secondary">{stats.totalBooks || 0}</div>
                <div className="stat-desc">In the system</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Published Books</div>
                <div className="stat-value text-success">{stats.publishedBooks || 0}</div>
                <div className="stat-desc">Available for sale</div>
            </div>

            <div className="stat bg-base-200 rounded-lg shadow-md">
                <div className="stat-figure text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <div className="stat-title">Librarians</div>
                <div className="stat-value text-info">{stats.librarians || 0}</div>
                <div className="stat-desc">Active librarians</div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">
                        {getGreeting()}, {user?.displayName || 'User'}!
                    </h1>
                    <p className="text-lg opacity-90">
                        Welcome to your {role} dashboard. Here's an overview of your activities.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard Statistics</h2>
                {role === 'user' && renderUserStats()}
                {role === 'librarian' && renderLibrarianStats()}
                {role === 'admin' && renderAdminStats()}
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title text-xl mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {role === 'user' && (
                            <>
                                <a href="/books" className="btn btn-primary">Browse Books</a>
                                <a href="/dashboard/my-orders" className="btn btn-secondary">View Orders</a>
                                <a href="/dashboard/my-profile" className="btn btn-accent">Update Profile</a>
                            </>
                        )}
                        {role === 'librarian' && (
                            <>
                                <a href="/dashboard/add-books" className="btn btn-primary">Add New Book</a>
                                <a href="/dashboard/orders" className="btn btn-secondary">Manage Orders</a>
                                <a href="/dashboard/my-books" className="btn btn-accent">My Books</a>
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                                <a href="/dashboard/users" className="btn btn-primary">Manage Users</a>
                                <a href="/dashboard/all-books" className="btn btn-secondary">Manage Books</a>
                                <a href="/dashboard/analytics" className="btn btn-accent">View Analytics</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;