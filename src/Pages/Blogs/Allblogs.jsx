import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../../Api/Api';

const Allblogs = () => {
    const [Blogs, setBlogs] = useState([]);


    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Blog/getall`);
            setBlogs(response.data);

        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top left corner of the page on component mount
    }, []);

    const htmlToPlainText = (html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.innerHTML || "";
    };

    return (
        <div className='container mx-auto relative'>
            <Link to="/" class="flex items-center absolute top-16 left-4 z-50 bg-slate-700 p-1 rounded-full pr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className='text-[#a0ff00] hover:underline pr-1'>Go Back</span>
            </Link>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <div class="text-center lg:w-2/3 w-full">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-300 hover-underline"> Explore Our Blogs </h2>
                        <p class="mb-8 leading-relaxed text-gray-400">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
                        <div class="flex justify-center">
                            {/* Additional content here */}
                        </div>
                    </div>
                </div>
            </section>

         

            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto container ">
                <div className="grid lg:grid-cols-2 gap-6">
                    {Blogs.map((member) => (

                        <Link to={`/blog/${member._id}`} className="group relative block rounded-2xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 picbox" href="#" >
                            <div className="flex-shrink-0 relative rounded-2xl overflow-hidden w-full h-[300px] before:absolute before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                                <img
                                    className="size-full absolute top-0 start-0 object-cover opacity-50"
                                    src={member.pic}
                                    alt="Image Description"
                                />
                            </div>
                            <div className="absolute top-0 inset-x-0 z-10">
                                <div className="p-4 flex flex-col h-full sm:p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 z-10">
                                <div className="flex flex-col h-full p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                                        {member.title.split(' ').slice(0, 30).join(' ')}
                                        {member.title.split(' ').length > 30 ? "..." : ""}
                                    </h3>

                                    <p className="mt-2 text-white/[.8]" dangerouslySetInnerHTML={{ __html: htmlToPlainText(member.content.split(' ').slice(0, 10).join(' ')) + (member.content.split(' ').length > 10 ? "..." : "") }} />

                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Allblogs