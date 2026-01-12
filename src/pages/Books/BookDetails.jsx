import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import useAuth from '../../assets/hooks/useAuth';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: book = {}, isLoading, isError } = useQuery({
        queryKey: ['book-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="skeleton h-96 w-full"></div>
                        <div className="space-y-4">
                            <div className="skeleton h-8 w-3/4"></div>
                            <div className="skeleton h-4 w-1/2"></div>
                            <div className="skeleton h-4 w-1/4"></div>
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-12 w-32"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
                    <p className="text-base-content/70 mb-4">The book you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/books')} className="btn btn-primary">
                        Browse Other Books
                    </button>
                </div>
            </div>
        );
    }

    const handleOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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

        try {
            const res = await axiosSecure.post('/orders', orderInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been placed. You can track it from your dashboard.',
                    icon: 'success',
                    confirmButtonText: 'View Orders'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard/my-orders');
                    }
                });
                setIsModalOpen(false);
                form.reset();
            }
        } catch (error) {
            console.error('Order failed:', error);
            Swal.fire({
                title: 'Order Failed',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Breadcrumb */}
            <div className="bg-base-200 py-4">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="breadcrumbs text-sm">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/books">Books</a></li>
                            <li className="text-base-content/70">{book.title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Book Image */}
                    <div className="flex justify-center">
                        <div className="card bg-base-200 shadow-lg max-w-md">
                            <figure className="p-6">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="rounded-lg shadow-md w-full h-96 object-cover"
                                />
                            </figure>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                            <p className="text-xl text-base-content/70 mb-4">by {book.author}</p>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-3xl font-bold text-primary">৳{book.price}</div>
                                <div className="badge badge-success badge-lg">Available</div>
                            </div>
                        </div>

                        {/* Book Description */}
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">About This Book</h3>
                                <p className="text-base-content/80 leading-relaxed">
                                    {book.description || `Discover "${book.title}" by ${book.author}. This captivating book offers readers an engaging journey through its pages. Perfect for book lovers who appreciate quality literature and compelling storytelling.`}
                                </p>
                            </div>
                        </div>

                        {/* Book Information */}
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">Book Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-medium">Author:</span>
                                        <p className="text-base-content/70">{book.author}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Price:</span>
                                        <p className="text-base-content/70">৳{book.price}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Status:</span>
                                        <p className="text-success font-medium">Available</p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Publisher:</span>
                                        <p className="text-base-content/70">{book.librarianEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Button */}
                        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg">
                            <div className="card-body text-center">
                                <h3 className="text-xl font-bold mb-2">Ready to Order?</h3>
                                <p className="mb-4 opacity-90">Get this book delivered to your doorstep safely and quickly</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="btn btn-accent btn-lg"
                                >
                                    Order Now - ৳{book.price}
                                </button>
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-base-200 rounded-lg">
                                <div className="text-2xl mb-2">🚚</div>
                                <h4 className="font-semibold">Fast Delivery</h4>
                                <p className="text-sm text-base-content/70">2-3 days nationwide</p>
                            </div>
                            <div className="text-center p-4 bg-base-200 rounded-lg">
                                <div className="text-2xl mb-2">📦</div>
                                <h4 className="font-semibold">Safe Packaging</h4>
                                <p className="text-sm text-base-content/70">Book-safe materials</p>
                            </div>
                            <div className="text-center p-4 bg-base-200 rounded-lg">
                                <div className="text-2xl mb-2">💰</div>
                                <h4 className="font-semibold">Secure Payment</h4>
                                <p className="text-sm text-base-content/70">Multiple options</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            {isModalOpen && (
                <dialog open className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-xl mb-6 text-center">
                            Place Your Order
                        </h3>

                        <div className="mb-6 p-4 bg-base-200 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={book.image} alt={book.title} className="w-16 h-20 object-cover rounded" />
                                <div>
                                    <h4 className="font-semibold">{book.title}</h4>
                                    <p className="text-sm text-base-content/70">by {book.author}</p>
                                    <p className="text-lg font-bold text-primary">৳{book.price}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleOrder} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    value={user.displayName || ""}
                                    readOnly
                                    className="input input-bordered bg-base-200"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered bg-base-200"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number *</span>
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    required
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Delivery Address *</span>
                                </label>
                                <textarea
                                    name="address"
                                    placeholder="Enter your complete delivery address"
                                    required
                                    className="textarea textarea-bordered h-24"
                                ></textarea>
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-outline"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setIsModalOpen(false)}>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default BookDetails;
