import React from 'react';
import useAuth from '../../assets/hooks/useAuth';
import useRole from '../../assets/hooks/useRole';
import Forbidden from '../../pages/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useRole()
    if (loading || isLoading) {
        return <p>Loading.....</p>
    }
    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }
    return children
};

export default AdminRoute;