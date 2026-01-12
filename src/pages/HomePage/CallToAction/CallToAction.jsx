import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl">
                    <div className="card-body text-center py-16">
                        <h2 className="text-5xl font-bold mb-6">Ready to Get Your Books Delivered?</h2>
                        <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                            Join thousands of book lovers who trust Book Courier for fast, safe, and reliable book delivery. 
                            Start your reading journey today!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/books" className="btn btn-accent btn-lg px-8">
                                Browse Books
                            </Link>
                            <Link to="/register" className="btn btn-outline btn-lg px-8 text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
                                Create Account
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-content/20">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <p className="opacity-90">Customer Support</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">99%</div>
                                <p className="opacity-90">Safe Delivery Rate</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">50K+</div>
                                <p className="opacity-90">Books Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;