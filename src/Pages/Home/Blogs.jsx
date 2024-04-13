import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SPYDERswooshbat from '../../img/new/SPYDERswooshbat_PurpleBlue_onBlackChrome.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../../Api/Api';

const Index = () => {
    const [Blogs, setBlogs] = useState([]);


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Blog/getall`);
            const latestBlogs = response.data.slice(0, 3); // Fetch only the latest 3 blogs
            setBlogs(latestBlogs);

        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    };

    const htmlToPlainText = (html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      };
      
    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <>
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center pt-5 lg:px-6 ">
                    <div className="mx-auto   max-w-screen-sm ">
                        <h2 className="mb-2 text-4xl tracking-tight font-extrabold hover-underline text-white dark:text-white">
                            Our Blogs
                        </h2>
                    </div>
                </div>
            </section>




            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4" id="blog-list">
                        {Blogs.length === 0 ? ( // Check if there are no Blogs
                            <div className="flex justify-center items-center h-5 ">
                                <p className="text-xl text-gray-300">No Blog available</p>
                            </div>
                        ) : (
                            <>
                                {Blogs.map((member) => (

                                    <Link to={`/blog/${member._id}`} className="p-4 md:w-1/3 cursor-pointer">
                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden picbox">
                                            <img
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={member.pic}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                {/* <h2 className="tracking-widest text-xs title-font font-medium  text-[#a0ff00] mb-1">
                                            CATEGORY
                                        </h2> */}
                                                <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                {member.title.split(' ').slice(0, 30).join(' ')}
                                                    {member.title.split(' ').length > 30 ? "..." : ""}
                                                </h1>
                                                <p className="leading-relaxed mb-3 text-gray-600">
                                                    {htmlToPlainText(member.content.split(' ').slice(0, 10).join(' '))}
                                                    {htmlToPlainText(member.content.split(' ').length > 10 ? "..." : "")}
                                                </p>
                                                <div className="flex items-center flex-wrap">
                                                    <a className="text-[#a0ff00] inline-flex items-center md:mb-2 lg:mb-0 ">
                                                        Learn More
                                                        <svg
                                                            className="w-4 h-4 ml-2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M5 12h14" />
                                                            <path d="M12 5l7 7-7 7" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}</>
                        )}
                    </div>
                    <div className="text-center mt-5">
                        <Link
                            to='/allblogs'
                            className="text-black bg-[#a0ff00] hover:bg-[#a0ff00] focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-green-900"
                        >
                            View all
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
