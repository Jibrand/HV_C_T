import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Api } from '../../Api/Api';
import { Link } from 'react-router-dom';

const Index = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading
    const carouselRef = useRef(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Reviews/getall`);
            setReviews(response.data);
            setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
            console.error('Error fetching Reviews:', error);
            setIsLoading(false); // Also set loading to false in case of error
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.next();
            }
        }, 5000); // Adjust the interval time (in milliseconds) as needed

        return () => clearInterval(interval);
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <section className="bg-transparent">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-6">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-2 text-4xl tracking-tight font-extrabold hover-underline text-white dark:text-white">
                            Our Testimonials
                        </h2>
                    </div>
                </div>
            </section>

            {isLoading ? (
                <div className="loader">Loading...</div>
            ) : (
                <Carousel ref={carouselRef} responsive={responsive} focusOnSelect={true}    >
                    {reviews.map((testimonial, index) => (
                        <div key={index} className="max-w-xl mt-12 mx-auto p-4 mb-14 cursor-pointer picbox1 rounded-2xl bg-transparent">
                            <div className="flex flex-col items-center text-center">
                                <img src={testimonial.pic} loading="lazy" className="w-28 h-28 rounded-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.6)] " alt={testimonial.name} />
                                <div className="mt-4">
                                    <h4 className="text-sm font-extrabold text-white">{testimonial.name}</h4>
                                    <p className="text-xs text-[#a0ff00] font-bold mt-1">{testimonial.designation}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-sm leading-relaxed text-gray-400">{testimonial.review}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
            <div className="caption-area text-center bg-transparent  - mb-24 ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' >Surf the HACKERverse® </Link>
      </div>
        </>
    );
};

export default Index;
