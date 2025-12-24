import React from 'react';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../assets/hooks/useAuth';

const MyBooks = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: books = [], refetch } = useQuery({
        queryKey: ['my-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books/librarian')
            return res.data
        }
    })

    const toggleStatus = (id, status) => {
        axiosSecure.patch(`/books/${id}`, {
            status: status === 'published' ? 'unpublished' : 'published'
        }).then(() => refetch())
    }

    return (
        <div className="p-6">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Book</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td><img src={book.image} className="w-12" /></td>
                            <td>{book.title}</td>
                            <td>{book.status}</td>
                            <td>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => toggleStatus(book._id, book.status)}
                                >
                                    Toggle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooks;
