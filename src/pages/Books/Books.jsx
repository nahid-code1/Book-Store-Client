import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';

const Book = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['published-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books?status=published');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading books...</p>;
    }

    // 🔍 SEARCH BY TITLE
    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    // 🔽 SORT BY PRICE
    if (sort === 'low-to-high') {
        filteredBooks = filteredBooks.sort((a, b) => a.price - b.price);
    }

    if (sort === 'high-to-low') {
        filteredBooks = filteredBooks.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Available Books
            </h2>

            {/* SEARCH & SORT */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by book name"
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort by price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>

            {/* BOOK GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                    <div
                        key={book._id}
                        className="card bg-base-100 shadow-md"
                    >
                        <figure>
                            <img
                                src={book.image}
                                alt={book.title}
                                className="h-56 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">
                                {book.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {book.author}
                            </p>

                            <p className="text-sm">
                                Category: {book.category}
                            </p>

                            <p className="font-semibold">
                                Price: ৳{book.price}
                            </p>

                            <div className="card-actions justify-end">
                                <Link to={`/books/${book._id}`}>
                                    <button className="btn btn-sm btn-primary">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <p className="text-center mt-10 text-gray-500">
                    No books found.
                </p>
            )}
        </div>
    );
};

export default Book;
