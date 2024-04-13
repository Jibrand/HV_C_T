import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Api } from '../../Api/Api';
import { Link } from 'react-router-dom';

const Index = () => {
  const [Team, setTeam] = useState([]);
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
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

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`${Api}/hv-comapny/team/getall`);
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching Team:', error);
    }
  };

  useEffect(() => {
    fetchTeam();
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
      <section className="bg-black">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-6 ">
          <div className="mx-auto max-w-screen-sm ">
            <h2 className="mb-2 text-4xl cursor-pointer tracking-tight font-extrabold hover-underline text-white dark:text-white">
              Our team
            </h2>
          </div>
        </div>
      </section>

      <Carousel
        responsive={responsive}
        ref={carouselRef}
        focusOnSelect={true}
        direction="rtl" // Change direction to "rtl" for right-to-left rotation
      >
        {Team.map((member) => (
          <div key={member.id} className="text-center bg-black hover:text-black text-[#a0ff00] dark:text-gray-400 cursor-pointer rounded-2xl hover:bg-[#a0ff00] picbox1 pt-[20px]">

            <img
              className="mx-auto mb-4 w-28 h-28 rounded-full"
              src={member.pic}
              loading="lazy"
              alt={`${member.name}'s Avatar`}
            />
            <h3 className="mb-1 text-2xl font-medium tracking-tight hover:text-black  ">
              <p href="#">{member.name}</p>
            </h3>
            <p className='text-gray-500'>{member.designation}</p>
            <ul className="flex justify-center mt-4 space-x-4">
            </ul>
          </div>
        ))}
      </Carousel>;
      <div className="caption-area text-center bg-transparent  mt-5 mb-24 ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' >Prowl the HACKERverse® </Link>
      </div>
    </>
  );
};

export default Index;
