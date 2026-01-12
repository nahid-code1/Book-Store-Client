import React from 'react';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });


    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/${user._id}`, { role: 'admin' })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: `${user.displayName} is now Admin`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            });
    };

    const handleRemoveAdmin = user => {
        axiosSecure.patch(`/users/${user._id}`, { role: 'user' })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: `Admin role removed`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            });
    };


    const handleMakeLibrarian = user => {
        axiosSecure.patch(`/users/${user._id}`, { role: 'librarian' })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: `${user.displayName} is now Librarian`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            });
    };

    const handleRemoveLibrarian = user => {
        axiosSecure.patch(`/users/${user._id}`, { role: 'user' })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: `Librarian role removed`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            });
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Total Users: {users.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full border rounded-lg">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Admin</th>
                            <th className="text-center">Librarian</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.displayName || 'N/A'}</td>
                                <td className="break-all">{user.email}</td>
                                <td className="capitalize">{user.role}</td>

                                {/* ADMIN BUTTONS */}
                                <td className="text-center">
                                    {
                                        user.role === 'admin' ? (
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-xs btn-success"
                                            >
                                                Make Admin
                                            </button>
                                        )
                                    }
                                </td>


                                {/* LIBRARIAN BUTTONS */}
                                <td className="text-center">
                                    {
                                        user.role === 'librarian' ? (
                                            <button
                                                onClick={() => handleRemoveLibrarian(user)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Remove Librarian
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeLibrarian(user)}
                                                className="btn btn-xs btn-info"
                                            >
                                                Make Librarian
                                            </button>
                                        )
                                    }
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Users;
