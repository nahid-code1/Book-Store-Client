import React from 'react';
import Logo from '../../pages/Shared/Logo/Logo';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='lg:max-w-7xl md:max-w-10/12 max-w-11/12 mx-auto'>
            <Logo></Logo>
            <div className="">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout; 