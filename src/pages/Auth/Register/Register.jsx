
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../assets/hooks/useAuth';

const Register = () => {
    const { registerUser, signInByGoogle } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegister = (data) => {
        console.log('after submit', data)
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleGoogleLogin = () => {
        signInByGoogle()
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
                <form
                    onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                    {/* Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

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
                            placeholder="Strong password"
                            {...register('password', {
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|\\:;"'<>,./~`]).{6,}$/,
                                    message:
                                        "Password must have uppercase, lowercase, number, special character and be at least 6 characters",
                                },
                            })}
                            className="input input-bordered w-full"
                            required
                        />
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-400'>Password must have uppercase, lowercase, number,<br /> special character and be at least 8 characters</p>
                        }
                        <label className="label">
                            <span className="label-text-alt">

                            </span>
                        </label>
                    </div>

                    {/* Profile Image URL */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Profile Image URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">
                            Register
                        </button>
                    </div>
                    <div className="">Already have an account? <Link to={'/login'} className='underline text-blue-400'>Login</Link> here</div>
                </form>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Google Login */}
                <div className="flex justify-center">
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border border-[#e5e5e5] w-full flex gap-2">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                        </svg>
                        Login with Google
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Register;
