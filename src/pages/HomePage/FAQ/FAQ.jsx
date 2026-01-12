import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How long does delivery take?",
            answer: "Delivery times vary by location. Within Dhaka, we offer same-day delivery. For other districts, delivery typically takes 2-3 business days. Express delivery options are available for urgent orders."
        },
        {
            question: "How do you ensure books are not damaged during delivery?",
            answer: "We use specialized book packaging materials including bubble wrap, cardboard protectors, and moisture-resistant covers. Our delivery team is trained specifically for handling books safely."
        },
        {
            question: "What are your delivery charges?",
            answer: "Delivery charges start from ৳50 within Dhaka and ৳80 for other districts. Bulk orders and regular customers enjoy discounted rates. Express delivery has additional charges."
        },
        {
            question: "Can I track my order?",
            answer: "Yes! Once your order is dispatched, you'll receive a tracking number via SMS and email. You can track your order in real-time through our website or mobile app."
        },
        {
            question: "What if my book arrives damaged?",
            answer: "We offer a 100% replacement guarantee for damaged books. Simply contact our customer service within 24 hours of delivery, and we'll arrange a free replacement or full refund."
        },
        {
            question: "Do you deliver to all areas of Bangladesh?",
            answer: "Yes, we deliver to all 64 districts of Bangladesh. Some remote areas may have slightly longer delivery times, but we ensure your books reach you safely."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept cash on delivery, mobile banking (bKash, Nagad, Rocket), credit/debit cards, and online banking. All online payments are secured with SSL encryption."
        },
        {
            question: "Can I cancel or modify my order?",
            answer: "Orders can be cancelled or modified within 2 hours of placement if they haven't been dispatched. Once dispatched, you can refuse delivery for a full refund minus delivery charges."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-base-content/70">
                        Find answers to common questions about our book delivery service
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="card bg-base-100 shadow-md">
                            <div className="card-body p-0">
                                <button
                                    className="w-full text-left p-6 flex justify-between items-center hover:bg-base-200 transition-colors"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                                    <span className={`text-2xl transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-6">
                                        <p className="text-base-content/80 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-lg text-base-content/70 mb-4">
                        Still have questions?
                    </p>
                    <a href="/contact" className="btn btn-primary">Contact Our Support Team</a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;