
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../assets/hooks/useAuth';
import useAxiosSecure from '../../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const { registerUser, signInByGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const password = watch('password');

    const handleRegister = async (data) => {
        setIsLoading(true);
        try {
            await registerUser(data.email, data.password);
            
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: data.photoURL || '',
            };
            
            const res = await axiosSecure.post('/users', userInfo);
            
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'Welcome to Book Courier! Your account has been created.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate(location?.state || '/');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Registration Failed',
                text: error.message || 'Please check your information and try again',
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
                title: 'Registration Successful!',
                text: 'Welcome to Book Courier!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(location?.state || '/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Registration Failed',
                text: 'Google registration failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
                            Create Account
                        </h2>
                        <p className="text-center text-base-content/70 mb-6">
                            Join Book Courier and start your reading journey
                        </p>

                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                    {...register('name', {
                                        required: 'Full name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        }
                                    })}
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email Address *</span>
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
                                    <span className="label-text font-medium">Password *</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|\\:;"'<>,./~`]).{6,}$/,
                                            message: "Password must have uppercase, lowercase, number, special character and be at least 6 characters",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-xs">{errors.password.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Confirm Password *</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value => value === password || 'Passwords do not match'
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.confirmPassword.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Profile Image URL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Profile Image URL</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg (optional)"
                                    className={`input input-bordered ${errors.photoURL ? 'input-error' : ''}`}
                                    {...register('photoURL', {
                                        pattern: {
                                            value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                                            message: 'Please enter a valid image URL'
                                        }
                                    })}
                                />
                                {errors.photoURL && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.photoURL.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        {...register('terms', {
                                            required: 'You must accept the terms and conditions'
                                        })}
                                    />
                                    <span className="label-text">
                                        I agree to the <a href="#" className="link link-primary">Terms of Service</a> and <a href="#" className="link link-primary">Privacy Policy</a>
                                    </span>
                                </label>
                                {errors.terms && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.terms.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <span className="text-base-content/70">Already have an account? </span>
                            <Link 
                                to="/login" 
                                state={location.state} 
                                className="link link-primary font-medium"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Google Registration */}
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

export default Register;
