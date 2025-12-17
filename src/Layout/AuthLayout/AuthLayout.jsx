import React from 'react';
import Logo from '../../pages/Shared/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className="">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout; 