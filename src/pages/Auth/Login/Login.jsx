import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLogin = (data) => {
        console.log("after submit", data)
    }
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
                <div className="w-full max-w-md p-8 bg-base-200 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-4">
                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6
                                })}
                                className="input input-bordered w-full"

                            />
                            {
                                errors.password?.type === 'required' && <p className='text-red-400'>Password is required</p>
                            }
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Login
                            </button>
                        </div>
                        <div className="">New to our website? <Link to={'/register'} className='underline text-blue-400'>Register</Link> here</div>
                    </form>

                    {/* Alternative Login */}
                    <div className="divider">OR</div>
                    <div className="flex justify-center gap-4">
                        <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;