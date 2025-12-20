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

        <div className="max-w-4xl mx-auto mt-8">
            <div className="card bg-base-100 shadow-md border">
                <div className="card-body">
                    <h2 className="card-title text-2xl md:my-4 flex justify-center underline text-yellow-500">My Orders</h2>

                    {/* Table header */}
                    <div className="grid grid-cols-4 font-semibold border-b pb-2 text-lg">
                        <span>Book Title</span>
                        <span>Order Date</span>
                        <span>Status</span>
                        <span className="text-right">Action</span>
                    </div>

                    {orders.map(order => <div key={order._id} className="grid grid-cols-4 items-center py-3 text-md">
                        <span>{order.bookTitle}</span>
                        <span>  {new Date(order.createdAt).toLocaleDateString('en-GB')}</span>
                        <span className="badge badge-warning badge-md">Pending</span>

                        <div className="flex gap-2 justify-end items-center">
                            <button onClick={() => handleOrderDelete(order._id)} className="btn btn-sm btn-outline btn-error">
                                Cancel
                            </button>
                            {
                                order.paymentStatus === 'paid' ?
                                    <div className="badge badge-success badge-md">
                                        <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
                                        Paid
                                    </div> :
                                    <Link className='btn btn-secondary btn-sm'>Pay Now</Link>

                            }
                        </div>
                    </div>)}

                </div>
            </div>
        </div>
    );
};

export default MyOrders;