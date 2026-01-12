import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';

const Books = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['published-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books?status=published');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Available Books</h2>
                    <p className="text-base-content/70 mt-2">Discover your next favorite read</p>
                </div>
                
                {/* Loading Skeletons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="card bg-base-200 shadow-md">
                            <div className="skeleton h-48 w-full"></div>
                            <div className="card-body">
                                <div className="skeleton h-4 w-3/4 mb-2"></div>
                                <div className="skeleton h-3 w-1/2 mb-2"></div>
                                <div className="skeleton h-3 w-1/4 mb-4"></div>
                                <div className="skeleton h-10 w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 🔍 SEARCH BY TITLE OR AUTHOR
    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    // 💰 FILTER BY PRICE RANGE
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filteredBooks = filteredBooks.filter(book => {
            const price = Number(book.price);
            if (max) {
                return price >= min && price <= max;
            } else {
                return price >= min; // For "500+" range
            }
        });
    }

    // 🔽 SORT BY PRICE OR TITLE
    if (sort === 'price-low') {
        filteredBooks = filteredBooks.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === 'price-high') {
        filteredBooks = filteredBooks.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === 'title-az') {
        filteredBooks = filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'title-za') {
        filteredBooks = filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-base-100 p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">Available Books</h2>
                <p className="text-xl text-base-content/70">Discover your next favorite read from our collection</p>
            </div>

            {/* Search & Filters */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="card bg-base-200 shadow-md">
                    <div className="card-body">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Search Books</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    className="input input-bordered"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            {/* Price Range Filter */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Price Range</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={priceRange}
                                    onChange={(e) => {
                                        setPriceRange(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">All Prices</option>
                                    <option value="0-100">৳0 - ৳100</option>
                                    <option value="100-300">৳100 - ৳300</option>
                                    <option value="300-500">৳300 - ৳500</option>
                                    <option value="500">৳500+</option>
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Sort By</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">Default</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="title-az">Title: A to Z</option>
                                    <option value="title-za">Title: Z to A</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Actions</span>
                                </label>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setSearch('');
                                        setSort('');
                                        setPriceRange('');
                                        setCurrentPage(1);
                                    }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="max-w-6xl mx-auto mb-6">
                <p className="text-base-content/70">
                    Showing {paginatedBooks.length} of {filteredBooks.length} books
                    {search && ` for "${search}"`}
                </p>
            </div>

            {/* Books Grid */}
            <div className="max-w-6xl mx-auto">
                {paginatedBooks.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold mb-2">No Books Found</h3>
                        <p className="text-base-content/70 mb-4">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setSearch('');
                                setSort('');
                                setPriceRange('');
                                setCurrentPage(1);
                            }}
                        >
                            Show All Books
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedBooks.map((book) => (
                            <div key={book._id} className="card bg-base-200 shadow-lg card-hover">
                                <figure className="px-4 pt-4">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="rounded-lg h-48 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h3 className="card-title text-lg font-bold line-clamp-2">
                                        {book.title}
                                    </h3>
                                    <p className="text-base-content/70 text-sm mb-2">
                                        by {book.author}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-primary">
                                            ৳{book.price}
                                        </span>
                                        <span className="badge badge-success">Available</span>
                                    </div>
                                    <div className="card-actions">
                                        <Link
                                            to={`/books/${book._id}`}
                                            className="btn btn-primary w-full"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="flex justify-center">
                        <div className="join">
                            <button
                                className="join-item btn"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                «
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            
                            <button
                                className="join-item btn"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;