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
        <div className="p-6">
            <h2 className="text-xl font-semibold">
                Pay {order.price} here for <span className="text-primary">{order?.bookTitle}</span>
            </h2>
            <button onClick={handlePayment} className='btn btn-secondary'>Pay Now</button>
        </div>
    );
};

export default Payment;
