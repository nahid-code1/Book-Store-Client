import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../../assets/hooks/useAxiosSecure';

const Payment = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: order, isLoading } = useQuery({
        queryKey: ['order', orderId],
        enabled: !!orderId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const handlePayment = async () => {
        const paymentInfo = {
            price: order.price,
            orderId: order._id,
            userEmail: order.userEmail,
            bookTitle: order.bookTitle
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.href = res.data.url
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl border">
                    <div className="card-body space-y-4">

                        <h2 className="text-center text-xl md:text-2xl font-semibold">
                            Complete Your Payment
                        </h2>

                        <div className="divider"></div>

                        <div className="space-y-2 text-sm md:text-base">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Book</span>
                                <span className="font-semibold text-right">
                                    {order?.bookTitle}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Price</span>
                                <span className="font-semibold text-primary">
                                    ৳ {order.price}
                                </span>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <button
                            onClick={handlePayment}
                            className="btn btn-secondary w-full"
                        >
                            Pay Now
                        </button>

                        <Link
                            to="/dashboard/my-orders"
                            className="text-center text-sm text-gray-500 hover:underline"
                        >
                            Back to My Orders
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Payment;
