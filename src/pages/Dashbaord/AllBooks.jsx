import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: books = [], isLoading, refetch } = useQuery({
        queryKey: ['all-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/books');
            return res.data;
        }
    });

    const toggleStatus = async (book) => {
        const newStatus =
            book.status === 'published' ? 'unpublished' : 'published';

        await axiosSecure.patch(`/admin/books/${book._id}/status`, {
            status: newStatus
        });

        refetch();
    };

    const deleteBook = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the book and all its orders!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        });

        if (result.isConfirmed) {
            await axiosSecure.delete(`/admin/books/${id}`);
            Swal.fire('Deleted!', 'Book has been deleted.', 'success');
            refetch();
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading books...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
                All Books (Admin)
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                </td>

                                <td>{book.title}</td>
                                <td>{book.author}</td>

                                <td>
                                    <span
                                        className={`badge ${book.status === 'published'
                                                ? 'badge-success'
                                                : 'badge-warning'
                                            }`}
                                    >
                                        {book.status}
                                    </span>
                                </td>

                                <td className="text-center space-x-2">
                                    <button
                                        className="btn btn-xs btn-info"
                                        onClick={() => toggleStatus(book)}
                                    >
                                        {book.status === 'published'
                                            ? 'Unpublish'
                                            : 'Publish'}
                                    </button>

                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() => deleteBook(book._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {books.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No books found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllBooks;
