import React,{useEffect,useState,useRef} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BLUMIRApocscreen from '../../img/new/BLUMIRApocscreen (1).jpg'
import { Api } from '../../Api/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Index = () => {
    const [Vodcasts, setVodcasts] = useState([]);

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

    const fetchVodcasts = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/youtube/getall`);
            setVodcasts(response.data);

        } catch (error) {
            console.error('Error fetching Vodcasts:', error);
        }
    };

    useEffect(() => {
        fetchVodcasts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          if (carouselRef.current) {
            const nextSlide = carouselRef.current.state.currentSlide + 1;
            const totalSlides = carouselRef.current.state.totalItems;
            const resetIndex = nextSlide >= totalSlides ? 0 : nextSlide;
            carouselRef.current.goToSlide(resetIndex);
          }
        }, 8000); // Adjust the interval time (in milliseconds) as needed
    
        return () => clearInterval(interval);
      }, []);

    return (
        <>
           

            <section className="  bg-transparent   ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center  lg:px-6 ">
                    <div className="mx-auto   max-w-screen-sm ">
                        <h2 className="mb-2 text-4xl tracking-tight font-extrabold hover-underline text-white dark:text-white">
                            VODCASTS LOVE US!
                        </h2>
                    </div>
                </div>
            </section>

            <Carousel responsive={responsive}
                focusOnSelect={true}
        ref={carouselRef}

            >
                {Vodcasts.map((member) => (
                    <>
                        <section className="text-gray-600 body-font  bg-transparent   ">
                            <div className="container px- py-[20px] mx-auto lg:p-32 md:p-32 p-2 picbox1  bg-transparent  rounded-3xl">
                                {/* YouTube Video Embed */}
                                <div className="relative picbox1  bg-transparent  rounded-3xl" style={{ paddingTop: "56.25%" }}>
                                    {/* Replace 'VIDEO_ID' with your YouTube video ID */}
                                    <iframe
                                        className="absolute inset-0 w-full h-full rounded-3xl lg:p-32 md:p-32 p-2 picbox1"
                                        src={member.link}
                                        title="YouTube Video"
                                        frameBorder="0"
                                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                </div>
                            </div>
                        </section>
                    </>
                ))}
            </Carousel>;
            <div className="caption-area text-center bg-transparent  mt-3 mb-24 ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' >Knoggin Jack the HACKERverse® </Link>
      </div>
        </>
    );
};

export default Index;
