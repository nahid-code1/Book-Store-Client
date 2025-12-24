import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
    return (
        <div className="w-full">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[400px]"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="hero h-full bg-base-200">
                        <div className="hero-content flex-col lg:flex-row">
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                                className="max-w-sm rounded-lg shadow-2xl"
                                alt="Books delivery"
                            />
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Fast & Safe Book Delivery
                                </h1>
                                <p className="py-4 text-base-content/80">
                                    We deliver your favorite books quickly and securely across
                                    the country.
                                </p>
                                <button className="btn btn-primary">
                                    Track Your Order
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/*  */}
                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="hero h-full bg-base-100">
                        <div className="hero-content text-center">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Doorstep Book Courier.
                                </h1>
                                <p className="py-4 text-base-content/80">
                                    From bookstores to your home — hassle-free delivery.
                                </p>
                                <button className="btn btn-secondary">
                                    Send a Book
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="hero h-full bg-base-200">
                        <div className="hero-content text-center">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Trusted by Book Lovers
                                </h1>
                                <p className="py-4 text-base-content/80">
                                    Reliable courier service made specially for books.
                                </p>
                                <button className="btn btn-accent">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;
