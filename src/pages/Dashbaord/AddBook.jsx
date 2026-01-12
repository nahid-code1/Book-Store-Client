import React, { useState } from 'react';
import useAxiosSecure from '../../assets/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../assets/hooks/useAuth';

const AddBook = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // console.log('user from add book', user)
    const [form, setForm] = useState({
        title: '',
        author: '',
        image: '',
        price: '',
        status: 'published'
    })

    const handleSubmit = e => {
        e.preventDefault()
        const bookData = {
            ...form,
            librarianEmail: user?.email
        }
        axiosSecure.post('/books', bookData).then(res => {
            if (res.data.insertedId) {
                Swal.fire('Book added', '', 'success')
                e.target.reset()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg">
            <input className="input input-bordered w-full" placeholder="Book Name"
                onChange={e => setForm({ ...form, title: e.target.value })} />

            <input className="input input-bordered w-full" placeholder="Author"
                onChange={e => setForm({ ...form, author: e.target.value })} />

            <input className="input input-bordered w-full" placeholder="Image URL"
                onChange={e => setForm({ ...form, image: e.target.value })} />

            <input type="number" className="input input-bordered w-full" placeholder="Price"
                onChange={e => setForm({ ...form, price: e.target.value })} />

            <select className="select select-bordered w-full"
                onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
            </select>

            <button className="btn btn-primary w-full">Add Book</button>
        </form>
    );
};

export default AddBook;
