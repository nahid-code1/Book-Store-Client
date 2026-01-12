import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            reset();
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="hero min-h-[40vh] bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-base-content/80">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-6">Send us a Message</h2>
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">First Name *</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John"
                                                className={`input input-bordered ${errors.firstName ? 'input-error' : ''}`}
                                                {...register('firstName', { required: 'First name is required' })}
                                            />
                                            {errors.firstName && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.firstName.message}</span>
                                                </label>
                                            )}
                                        </div>
                                        
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Last Name *</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                className={`input input-bordered ${errors.lastName ? 'input-error' : ''}`}
                                                {...register('lastName', { required: 'Last name is required' })}
                                            />
                                            {errors.lastName && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.lastName.message}</span>
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email *</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                                            {...register('email', { 
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.email.message}</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+880 1234 567890"
                                            className="input input-bordered"
                                            {...register('phone')}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Subject *</span>
                                        </label>
                                        <select 
                                            className={`select select-bordered ${errors.subject ? 'input-error' : ''}`}
                                            {...register('subject', { required: 'Please select a subject' })}
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Customer Support</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="complaint">Complaint</option>
                                            <option value="suggestion">Suggestion</option>
                                        </select>
                                        {errors.subject && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.subject.message}</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Message *</span>
                                        </label>
                                        <textarea
                                            placeholder="Tell us how we can help you..."
                                            className={`textarea textarea-bordered h-32 ${errors.message ? 'input-error' : ''}`}
                                            {...register('message', { 
                                                required: 'Message is required',
                                                minLength: {
                                                    value: 10,
                                                    message: 'Message must be at least 10 characters'
                                                }
                                            })}
                                        ></textarea>
                                        {errors.message && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.message.message}</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control mt-6">
                                        <button 
                                            type="submit" 
                                            className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title text-xl mb-4">Get in Touch</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content">
                                                📍
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Address</h4>
                                                <p className="text-base-content/70">123 Book Street, Dhaka 1000, Bangladesh</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-content">
                                                📞
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Phone</h4>
                                                <p className="text-base-content/70">+880 1234 567890</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-content">
                                                ✉️
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Email</h4>
                                                <p className="text-base-content/70">support@bookcourier.com</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-info rounded-full flex items-center justify-center text-info-content">
                                                🕒
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Business Hours</h4>
                                                <p className="text-base-content/70">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                                <p className="text-base-content/70">Sat: 10:00 AM - 4:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Quick Links */}
                            <div className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title text-xl mb-4">Quick Help</h3>
                                    <div className="space-y-2">
                                        <a href="#" className="link link-hover block">How to track my order?</a>
                                        <a href="#" className="link link-hover block">What are your delivery charges?</a>
                                        <a href="#" className="link link-hover block">How to cancel an order?</a>
                                        <a href="#" className="link link-hover block">Return and refund policy</a>
                                        <a href="#" className="link link-hover block">Packaging guidelines</a>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="card bg-base-200 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title text-xl mb-4">Follow Us</h3>
                                    <div className="flex gap-4">
                                        <a href="#" className="btn btn-circle btn-outline">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="btn btn-circle btn-outline">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="btn btn-circle btn-outline">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87C3.44 4.78 4.2 4 5.47 4c1.26 0 2.02.78 2.05 1.89C7.52 6.93 6.73 7.76 5.47 7.76zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="btn btn-circle btn-outline">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017-.001z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;