import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="hero min-h-[60vh] bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold mb-6">About Book Courier</h1>
                        <p className="text-xl text-base-content/80 leading-relaxed">
                            We are Bangladesh's premier book delivery service, connecting readers with their favorite books 
                            through fast, secure, and reliable courier services across all 64 districts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-base-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="card bg-base-200 shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                To make books accessible to every reader in Bangladesh by providing the most reliable, 
                                affordable, and efficient book delivery service. We believe that knowledge should have no boundaries.
                            </p>
                        </div>
                        <div className="card bg-base-200 shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h2>
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                To become the leading book logistics platform in South Asia, fostering a culture of reading 
                                and learning by connecting authors, publishers, and readers seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-base-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                        <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                            Founded in 2020, Book Courier started as a small initiative to help book lovers 
                            during the pandemic when bookstores were closed.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-6xl font-bold text-primary mb-4">2020</div>
                            <h3 className="text-xl font-semibold mb-2">Founded</h3>
                            <p className="text-base-content/70">Started with a vision to deliver books safely during COVID-19</p>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-secondary mb-4">2022</div>
                            <h3 className="text-xl font-semibold mb-2">Expansion</h3>
                            <p className="text-base-content/70">Expanded to cover all 64 districts of Bangladesh</p>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-accent mb-4">2024</div>
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-base-content/70">Launched digital platform with advanced tracking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Values */}
            <section className="py-20 bg-base-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-base-content/70">The principles that guide everything we do</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-200 shadow-md p-6 text-center card-hover">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-2">Book Safety</h3>
                            <p className="text-base-content/70">Every book is handled with utmost care and protection</p>
                        </div>
                        <div className="card bg-base-200 shadow-md p-6 text-center card-hover">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Speed</h3>
                            <p className="text-base-content/70">Fast delivery without compromising on safety</p>
                        </div>
                        <div className="card bg-base-200 shadow-md p-6 text-center card-hover">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-xl font-semibold mb-2">Trust</h3>
                            <p className="text-base-content/70">Building lasting relationships with our customers</p>
                        </div>
                        <div className="card bg-base-200 shadow-md p-6 text-center card-hover">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-base-content/70">Continuously improving our services and technology</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-20 bg-primary text-primary-content">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl opacity-90">Numbers that tell our story</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">50K+</div>
                            <p className="text-lg opacity-90">Books Delivered</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">10K+</div>
                            <p className="text-lg opacity-90">Happy Customers</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">64</div>
                            <p className="text-lg opacity-90">Districts Covered</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">99%</div>
                            <p className="text-lg opacity-90">Safe Delivery Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-base-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Experience Book Courier?</h2>
                    <p className="text-xl text-base-content/70 mb-8">
                        Join thousands of book lovers who trust us with their precious books
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/books" className="btn btn-primary btn-lg">Browse Books</a>
                        <a href="/contact" className="btn btn-outline btn-lg">Contact Us</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;