import React,{useEffect,useState,useRef} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BLUMIRApocscreen from '../../img/new/BLUMIRApocscreen (1).jpg'
import axios from 'axios';
import { Api } from '../../Api/Api';
import { Link } from 'react-router-dom';

const Index = () => {
    // Dummy data representing team members
    const [Spotifys, setSpotifys] = useState([]);
    const carouselRef = useRef(null);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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

    const fetchSpotifys = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Spotify/getall`);
            setSpotifys(response.data);

        } catch (error) {
            console.error('Error fetching Spotifys:', error);
        }
    };

    useEffect(() => {
        fetchSpotifys();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          if (carouselRef.current) {
            const nextSlide = carouselRef.current.state.currentSlide + 1;
            const totalSlides = carouselRef.current.state.totalItems;
            const resetIndex = nextSlide >= totalSlides ? 0 : nextSlide;
            carouselRef.current.goToSlide(resetIndex);
          }
        }, 10000); // Adjust the interval time (in milliseconds) as needed
    
        return () => clearInterval(interval);
      }, []);
    return (
        <>
           

            <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center  lg:px-6 ">
                    <div className="mx-auto   max-w-screen-sm ">
                        <h2 className="mb-2 text-4xl tracking-tight font-extrabold hover-underline text-white dark:text-white">
                            PODCASTS LOVE US!
                        </h2>
                    </div>
                </div>
            </section>

            <Carousel responsive={responsive}
                focusOnSelect={true}
        ref={carouselRef}

            >
                {Spotifys.map((member) => (
                    <>
                            <section className="text-gray-600 body-font  bg-transparent ">
                                <div className="container px- py-[20px] mx-auto picbox1 rounded-3xl  lg:p-32 md:p-32 p-2">
                                    {/* YouTube Video Embed */}
                                    <div className="relative  picbox1 rounded-3xl overflow-hidden lg:pt-46 md:pt-46 pt-80">
 

                                        {/* Replace 'VIDEO_ID' with your YouTube video ID */}
                                        <iframe
                                            className=" overflow-hidden absolute inset-0 w-full h-full rounded-lg lg:p-32 md:p-32 p-2"
                                            src={member.link}
                                            title="YouTube Video"
                                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                        ></iframe>
                                    </div>
                                </div>
                            </section>
                    </>
                ))}
            </Carousel>;
            <div className="caption-area text-center bg-transparent  mt-3 mb-24 ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' >Brain Melt in the HACKERverse® </Link>
      </div>
        </>
    );
};

export default Index;
