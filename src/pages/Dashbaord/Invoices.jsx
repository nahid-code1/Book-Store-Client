import React from 'react';
import useAuth from '../../assets/hooks/useAuth';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Invoices = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-semibold border-b pb-2">
                <span>Book Title</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Transaction ID</span>
            </div>
            {payments.map(payment => (
                <div key={payment._id} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b items-center">
                    <div>
                        <p className="md:hidden text-sm font-semibold text-gray-500">Book</p>
                        <span>{payment.bookTitle}</span>
                    </div>
                    <div>
                        <p className="md:hidden text-sm font-semibold text-gray-500">Amount</p>
                        <span>${payment.amount}</span>
                    </div>
                    <div>
                        <p className="md:hidden text-sm font-semibold text-gray-500">Date</p>
                        <span>{new Date(payment.paidAt).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div>
                        <p className="md:hidden text-sm font-semibold text-gray-500">Transaction ID</p>
                        <span className="break-words">{payment.transactionId}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Invoices;
