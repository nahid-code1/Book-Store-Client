import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="text-center">
                <div className="text-9xl font-bold text-error mb-4">403</div>
                <h1 className="text-4xl font-bold text-base-content mb-4">Access Forbidden</h1>
                <p className="text-lg text-base-content/70 mb-8">
                    You don't have permission to access this resource.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;