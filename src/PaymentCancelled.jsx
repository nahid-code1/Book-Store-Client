import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className="text-4xl">Payment is cancelled, <br />please try again</h2>
            <Link to={'/dashboard/my-orders'} className='btn btn-secondary'>Go Back</Link>
        </div>
    );
};

export default PaymentCancelled;