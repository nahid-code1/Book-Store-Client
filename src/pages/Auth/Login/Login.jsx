import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../assets/hooks/useAuth';
import useAxiosSecure from '../../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, signInByGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data) => {
        setIsLoading(true);
        try {
            await signInUser(data.email, data.password);
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back to Book Courier',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(location?.state || '/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Please check your credentials and try again',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await signInByGoogle();
            const userInfo = {
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            };
            
            await axiosSecure.post('/users', userInfo);
            
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome to Book Courier',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(location?.state || '/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Login Failed',
                text: 'Google login failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = (role) => {
        const demoCredentials = {
            user: { email: 'user@demo.com', password: 'User123!' },
            librarian: { email: 'librarian@demo.com', password: 'Librarian123!' },
            admin: { email: 'admin@demo.com', password: 'Admin123!' }
        };

        const credentials = demoCredentials[role];
        setValue('email', credentials.email);
        setValue('password', credentials.password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
                            Welcome Back
                        </h2>
                        <p className="text-center text-base-content/70 mb-6">
                            Sign in to your Book Courier account
                        </p>

                        {/* Demo Login Buttons */}
                        <div className="mb-6">
                            <p className="text-sm font-medium mb-3 text-center">Quick Demo Login:</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('user')}
                                    className="btn btn-outline btn-sm"
                                >
                                    User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('librarian')}
                                    className="btn btn-outline btn-sm"
                                >
                                    Librarian
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDemoLogin('admin')}
                                    className="btn btn-outline btn-sm"
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <div className="divider">OR</div>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password.message}</span>
                                    </label>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <span className="text-base-content/70">New to Book Courier? </span>
                            <Link 
                                to="/register" 
                                state={location.state} 
                                className="link link-primary font-medium"
                            >
                                Create Account
                            </Link>
                        </div>

                        {/* Google Login */}
                        <div className="divider">OR</div>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className={`btn btn-outline w-full ${isLoading ? 'btn-loading' : ''}`}
                        >
                            {!isLoading && (
                                <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
                                </svg>
                            )}
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;