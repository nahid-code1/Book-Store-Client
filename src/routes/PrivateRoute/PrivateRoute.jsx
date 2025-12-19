import React from 'react';
import useAuth from '../../assets/hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth()
    if (loading) {
        return (<div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>)
    }
    if (!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;