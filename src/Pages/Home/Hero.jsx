import React from 'react'
import demos from '../../img/demos-icon.svg'
import logo from '../../img/HV_horizatonal_website_logo.png'
import { Link } from 'react-router-dom'
import gif1 from '../../img/new/gif.gif'
import CategoryCreator from '../../img/new/MOCKEDupgoldwhite2.png'

const Hero = () => {
  return (
    <>
      <div className="banner-top  bg-transparent  mb-10   "  >
        <div className="custom-container">
          <div className="logo">
            <a href="">
              <img src={logo} alt="" className='mb-5' />
              <img src={CategoryCreator} alt="" />
            </a>
          </div>
          <div className="bnr-sec -mt-[100px]">
            <div className="caption-area text-center">
              <div className="demos-btn">
                <span className="ico">
                  <img src={demos} alt="demos" />
                </span>
                <span className="txt">Data. Dissent. Disrupiton. Destroying the POC Maelstrom.</span>
              </div>
              <div className="title-tp text-center text-lg mx-auto relative">
                Welcome to the HACKERvers<span className="relative">e<span className="text-lg absolute top-0" style={{ fontSize: '1.5rem' }}>®</span></span>
              </div>




              <p>
                AI-Powered Self-Service PoC Platform for Cybersecurity. Our
                cutting-edge AI platform makes it a breeze for everyone to give
                cybersecurity software a try!
              </p>
              <Link
                to="/contact/"
                className="lr-more mx-auto px-3 mb-24"
              >
                Join the PoC Revolution Now!
              </Link>

            </div>
          </div>
          <a href="#view-down" className="scroll-down " address="true" />
          <br/> 
        </div>
      </div>
    </>
  )
}

export default Hero