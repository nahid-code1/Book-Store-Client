import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import useAuth from '../../assets/hooks/useAuth';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const { data: book = {}, isLoading, isError } = useQuery({
        queryKey: ['book-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center mt-10">Loading book details...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load book details.</p>;

    const handleOrder = e => {
        e.preventDefault();

        const form = e.target;

        const orderInfo = {
            bookId: book._id,
            bookTitle: book.title,
            bookImage: book.image,
            price: book.price,

            librarianEmail: book.librarianEmail,
            userName: user.displayName,
            userEmail: user.email,
            phone: form.phone.value,
            address: form.address.value
        };

        axiosSecure.post('/orders', orderInfo).then(res => {
            if (res.data.insertedId) {
                Swal.fire('Order Placed!', '', 'success');
                setOpen(false);
                form.reset();
                navigate('/dashboard/my-orders');
            }
        });
    };
    // console.log(user)

    return (
        <div className="p-10 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <img src={book.image} className="rounded-lg shadow" />

                <div>
                    <h2 className="text-3xl font-bold">{book.title}</h2>
                    <p className="text-gray-600 mt-2">Author: {book.author}</p>
                    <p className="mt-4">Price: ৳{book.price}</p>

                    <button
                        onClick={() => setOpen(true)}
                        className="btn btn-primary mt-6"
                    >
                        Order Now
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {open && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Place Order
                        </h3>

                        <form onSubmit={handleOrder} className="space-y-3">
                            <input
                                value={user.displayName || "Username is Unavailable"}
                                readOnly
                                className="input input-bordered w-full"
                            />

                            <input
                                value={user.email}
                                readOnly
                                className="input input-bordered w-full"
                            />

                            <input
                                name="phone"
                                placeholder="Phone Number"
                                required
                                className="input input-bordered w-full"
                            />

                            <textarea
                                name="address"
                                placeholder="Address"
                                required
                                className="textarea textarea-bordered w-full"
                            ></textarea>

                            <button className="btn btn-primary w-full">
                                Place Order
                            </button>
                        </form>

                        <div className="modal-action">
                            <button
                                onClick={() => setOpen(false)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default BookDetails;
