import React from 'react';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../assets/hooks/useAuth';

const Orders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['librarian-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/librarian');
            return res.data;
        }
    });

    const cancelOrder = async (id) => {
        await axiosSecure.patch(`/orders/${id}/cancel`);
        refetch();
    };

    const updateStatus = async (id, status) => {
        await axiosSecure.patch(`/orders/${id}/status`, {
            orderStatus: status
        });
        refetch();
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Paid Orders</h2>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>User</th>
                        <th>Order Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.bookTitle}</td>
                            <td>{order.userEmail}</td>

                     
                            <td>
                                <select
                                    className="select select-sm select-bordered"
                                    value={order.orderStatus}
                                    disabled={order.orderStatus === 'delivered'}
                                    onChange={(e) =>
                                        updateStatus(order._id, e.target.value)
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>

                            <td>
                                <span className="badge badge-success">
                                    Paid
                                </span>
                            </td>

       
                            <td>
                                {order.orderStatus !== 'delivered' && (
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => cancelOrder(order._id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
