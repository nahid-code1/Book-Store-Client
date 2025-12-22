import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../assets/hooks/useAuth';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyOrders = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`)
            return res.data

        }
    })
    console.log("Fetching orders for:", user.email)
    const handleOrderDelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been canceled.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (

        <div className="max-w-4xl mx-auto mt-8 px-2 md:px-0">
            <div className="card bg-base-100 shadow-md border">
                <div className="card-body">
                    <h2 className="card-title text-2xl md:my-4 flex justify-center underline text-yellow-500">
                        My Orders
                    </h2>

                    <div className="hidden md:grid grid-cols-4 font-semibold border-b pb-2 text-lg">
                        <span>Book Title</span>
                        <span>Order Date</span>
                        <span>Status</span>
                        <span className="text-right">Action</span>
                    </div>

                    {orders.map(order => (
                        <div
                            key={order._id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 items-start md:items-center py-4 border-b"
                        >
                            {/* Book title */}
                            <div>
                                <p className="md:hidden font-semibold text-sm text-gray-500">Book</p>
                                <span>{order.bookTitle}</span>
                            </div>

                            {/* Date */}
                            <div>
                                <p className="md:hidden font-semibold text-sm text-gray-500">Date</p>
                                <span>{new Date(order.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="md:hidden font-semibold text-sm text-gray-500">Status</p>
                                <span className="badge badge-warning badge-md">Pending</span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 md:justify-end">
                                <button
                                    onClick={() => handleOrderDelete(order._id)}
                                    className="btn btn-sm btn-outline btn-error"
                                >
                                    Cancel
                                </button>

                                {order.paymentStatus === 'paid' ? (
                                    <div className="badge badge-success badge-md flex items-center gap-1">
                                        <svg
                                            className="size-[1em]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                            <polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        Paid
                                    </div>
                                ) : (
                                    <Link
                                        to={`/dashboard/payment/${order._id}`}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        Pay Now
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MyOrders;