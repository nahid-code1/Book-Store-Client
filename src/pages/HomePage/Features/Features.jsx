import React from 'react';

const Features = () => {
    const features = [
        {
            icon: "📦",
            title: "Secure Packaging",
            description: "Professional book packaging to ensure your books arrive in perfect condition"
        },
        {
            icon: "🚚",
            title: "Fast Delivery",
            description: "Express delivery across Bangladesh with real-time tracking"
        },
        {
            icon: "💰",
            title: "Affordable Rates",
            description: "Competitive pricing designed specifically for book deliveries"
        },
        {
            icon: "📱",
            title: "Easy Tracking",
            description: "Track your orders in real-time with our mobile-friendly platform"
        },
        {
            icon: "🔒",
            title: "Secure Payment",
            description: "Multiple secure payment options including mobile banking"
        },
        {
            icon: "🎯",
            title: "Nationwide Coverage",
            description: "Delivering to all 64 districts of Bangladesh"
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Choose Book Courier?</h2>
                    <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                        We provide specialized courier services designed specifically for books, 
                        ensuring safe and fast delivery across Bangladesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="card bg-base-200 shadow-lg p-6 text-center card-hover">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-base-content/70">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;