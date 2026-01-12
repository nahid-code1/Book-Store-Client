import React from 'react';

const Services = () => {
    const services = [
        {
            title: "Book Delivery",
            description: "Fast and secure delivery of books from publishers to readers",
            icon: "📚",
            features: ["Same-day delivery in Dhaka", "2-3 days nationwide", "Book-safe packaging"]
        },
        {
            title: "Bulk Orders",
            description: "Special rates for educational institutions and libraries",
            icon: "📦",
            features: ["Volume discounts", "Scheduled deliveries", "Dedicated support"]
        },
        {
            title: "Return Service",
            description: "Easy return and exchange service for damaged or wrong books",
            icon: "🔄",
            features: ["Free return pickup", "Quick refunds", "Exchange guarantee"]
        },
        {
            title: "Express Delivery",
            description: "Urgent book delivery for time-sensitive orders",
            icon: "⚡",
            features: ["Within 24 hours", "Priority handling", "Real-time updates"]
        }
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                        Comprehensive book delivery solutions tailored to meet all your reading needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="card bg-base-100 shadow-lg card-hover">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl">{service.icon}</div>
                                    <h3 className="card-title text-2xl">{service.title}</h3>
                                </div>
                                <p className="text-base-content/70 mb-4">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="text-success">✓</span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;