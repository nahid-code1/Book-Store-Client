import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Ahmed",
            role: "Book Lover",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            rating: 5,
            text: "Book Courier has been amazing! They delivered my textbooks safely and on time. The packaging was excellent and the tracking system kept me updated throughout."
        },
        {
            name: "Dr. Rahman",
            role: "University Professor",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            rating: 5,
            text: "As an educator, I often need to order books in bulk. Book Courier's bulk service is fantastic - great rates and reliable delivery every time."
        },
        {
            name: "Fatima Khan",
            role: "Student",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            rating: 5,
            text: "Living in a remote area, getting books was always a challenge. Book Courier changed that - now I can get any book delivered to my doorstep!"
        },
        {
            name: "Mohammad Ali",
            role: "Bookstore Owner",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            rating: 5,
            text: "We've been using Book Courier for our online orders. Their service is professional, and our customers are always happy with the delivery experience."
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
                    <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                        Don't just take our word for it - hear from thousands of satisfied customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card bg-base-200 shadow-lg card-hover">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={testimonial.image} alt={testimonial.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                        <p className="text-base-content/70">{testimonial.role}</p>
                                        <div className="rating rating-sm">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <input key={i} type="radio" className="mask mask-star-2 bg-orange-400" disabled checked />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-base-content/80 italic">"{testimonial.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;