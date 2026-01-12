import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        // Simulate newsletter subscription
        setTimeout(() => {
            Swal.fire({
                title: 'Subscribed!',
                text: 'Thank you for subscribing to our newsletter. You will receive updates about new books and special offers.',
                icon: 'success',
                confirmButtonText: 'Great!'
            });
            reset();
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-4">Stay Updated with Book Courier</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Subscribe to our newsletter and be the first to know about new book arrivals, 
                        special discounts, and delivery updates.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                    <div className="join w-full">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className={`input input-bordered join-item flex-1 text-base-content ${errors.email ? 'input-error' : ''}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        <button 
                            type="submit" 
                            className={`btn btn-accent join-item ${isSubmitting ? 'btn-loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                    {errors.email && (
                        <p className="text-error text-sm mt-2 text-left">{errors.email.message}</p>
                    )}
                </form>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-3xl mb-2">📚</div>
                        <h3 className="font-semibold mb-1">New Arrivals</h3>
                        <p className="text-sm opacity-80">Get notified about latest books</p>
                    </div>
                    <div>
                        <div className="text-3xl mb-2">💰</div>
                        <h3 className="font-semibold mb-1">Special Offers</h3>
                        <p className="text-sm opacity-80">Exclusive discounts for subscribers</p>
                    </div>
                    <div>
                        <div className="text-3xl mb-2">📦</div>
                        <h3 className="font-semibold mb-1">Delivery Updates</h3>
                        <p className="text-sm opacity-80">Service improvements and news</p>
                    </div>
                </div>

                <p className="text-sm opacity-70 mt-8">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;