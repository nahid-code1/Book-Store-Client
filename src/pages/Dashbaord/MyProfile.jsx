import React, { useState } from 'react';
import useAuth from '../../assets/hooks/useAuth';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const { user, userDb } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [name, setName] = useState(userDb?.name || user?.displayName || '');
    const [photo, setPhoto] = useState(userDb?.photo || user?.photoURL || '');

    const handleUpdate = async e => {
        e.preventDefault();

        await axiosSecure.patch(`/users/${userDb._id}`, {
            name,
            photo
        });

        Swal.fire('Profile updated!', '', 'success');
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            {/* CURRENT USER INFO */}
            <div className="text-center space-y-2">
                <img
                    src={photo || user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h2 className="text-xl font-semibold">
                    {user?.displayName}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
            </div>
            <p className='text-2xl text-center'>Update Info</p>
            {/* UPDATE FORM */}
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    className="input input-bordered w-full"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                />

                <input
                    className="input input-bordered w-full"
                    value={photo}
                    onChange={e => setPhoto(e.target.value)}
                    placeholder="Image URL"
                />

                <button className="btn btn-primary w-full">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
