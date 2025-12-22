import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from './assets/hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId
                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border">
                <div className="card-body text-center space-y-4">

                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="rounded-full bg-success/10 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-success"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-success">
                        Payment Successful
                    </h2>

                    {/* Message */}
                    <p className="text-sm md:text-base text-gray-500">
                        Thank you! Your payment has been processed successfully.
                    </p>

                    {/* Transaction ID */}
                    {paymentInfo.transactionId && (
                        <div className="bg-base-200 rounded-lg p-3 text-sm break-all">
                            <span className="font-semibold">Transaction ID:</span>
                            <p className="mt-1 text-primary">
                                {paymentInfo.transactionId}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
