import { useState, useEffect } from 'react'
import CATEN8logo_onTrans from '../../img/new/CATEN8logo_onTrans3.png'
import DenteonENDingLogo_stacked_outlines_blackChrome from '../../img/new/DenteonENDingLogo_stacked_outlines_blackChrome.png'
import HV_HEIMDALLdata_vikingfire_chromeOutline from '../../img/new/HEIMDALLdata_vikingfire_chromeOutline2.png'
import Anonybit from '../../img/new/Anonybit.png'
import DC719jack from '../../img/new/DC719jack2.png'
import HV_PLEXtrac_LogoWithBlackOutline from '../../img/new/PlexTrac-Logo-Stacked-Purplex-White-Lettering3.png'
import HV_PROCYON_BLUEoriginal from '../../img/new/PROCYON_BLUEoriginal3.png'
import HV_NATsec_unicorn_stickercut_blackChrome from '../../img/new/HV_NATsec_unicorn_stickercut_blackChrome.png'
import SPYDERswooshbat_PurpleBlue_onBlackChrome from '../../img/new/SPYDERswooshbat_PurpleBlue_onBlackChrome.png'
import HV_VIVAdere_CHROME from '../../img/new/HV_VIVAdere_CHROME.png'
import HVbsideslogointro from '../../img/new/HV-bsides-logo-intro.png'
import SAEPiologo_stickercut from '../../img/new/SAEPiologo_stickercut.png'
import BLUMIRAwordonlyChrome from '../../img/new/BLUMIRAwordonlyChrome.png'
import BLUMIRApocscreen from '../../img/new/SENTEONpocscreen.jpg'
import demos from '../../img/demos-icon.svg'
import HV_NEW_AI_Machine from '../../img/new/HV_NEW_AI_Machine_blues (1).png'
import CRAIG from '../../img/new/CRAIG.jpg'
import MARIANA from '../../img/new/MARIANA.jpg'
import SPYDERswooshbat from '../../img/new/SPYDERswooshbat_PurpleBlue_onBlackChrome.png'
import KeenSlider from 'keen-slider';
import Index from './Teams'
import Blogs from './Blogs'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'
import Paragraph from './Paragraph'
import TwoButtons from './TwoButtons'
import Footer from './Footer'
import Quote from './Quote'
import Hero from './Hero'
import PodcastVideo from './PodcastVideo'
import Spotify from './Spotify'
import SideChat from '../../img/support.svg'
import orb from '../../img/orb/orb.gif'
import orbmp4 from '../../img/orb/orb.gif'
import orbtwitter from '../../img/twitter.png'
import redorbyoutube from '../../img/redorb-youtube.png'
import redorbinsta from '../../img/redorb-insta.png'
import redorbdiscord from '../../img/redorb-discord.png'
import redorbreddit from '../../img/redorb-reddit.png'
import redorbtwitch from '../../img/redorb-twitch.png'
import gif1 from '../../img/new/gif1.gif'
import { Link } from 'react-router-dom'
import DialogflowMessenger from '../DialogFlow'
const index = () => {

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="description" content="HACKERverse® is the 'hands-on demo tool' of choice for non-cybersecurity and cybersecurity professionals. Rent-a-Demo today." />
      <meta name="title" content="HACKERverse®" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="css/bootstrap.css" rel="stylesheet" />
      <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="css/banner.css" />
      <link rel="stylesheet" href="css/footer.css" />
      <link rel="stylesheet" href="css/common.css" />
      <link rel="stylesheet" href="css/orb.css" />
      <link rel="stylesheet" href="css/slick.css" />
      <link rel="stylesheet" href="css/slick-theme.css" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/pagedone@1.1.2/src/css/pagedone.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-RRQIeP9fF0W4BrJoj5ftyp6MUE6wPa34veqO+eEyTCtJhN8L7L6U7p6lyHRyiw2Z" crossOrigin="anonymous" />
      <title>HACKERverse®</title>


      <Hero />

      <section className="white-th eme  bg-transparent   " id="view-down">
        <div className="custom-container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-are">
                <article>
                  <div className="primary-heading">
                    <div className="lg:text-4xl md:text-4xl text-3xl hover-underline">
                      Meet our Rockstar Customers!
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          {/*  */}


          <div className='' style={{ background: `url(${gif1}) center center / cover no-repeat`, }}>


          </div>




          {/*  */}
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap- justify-center  bg-transparent   ">

            <div className="flex justify-center">
              <img className="h-auto max-w-full   rounded-lg" src={CATEN8logo_onTrans} alt="" />
            </div>

            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg " src={DenteonENDingLogo_stacked_outlines_blackChrome} alt="" />
            </div>

            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={HV_VIVAdere_CHROME} alt="" />
            </div>

            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={HV_PROCYON_BLUEoriginal} alt="" />
            </div>

            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={HV_PLEXtrac_LogoWithBlackOutline} alt="" />
            </div>
          </div>
          {/*    */}
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-10 justify-center -mt-6  bg-transparent   ">
            <div className="flex justify-center ">
              <img className="h-auto max-w-full rounded-lg" src={Anonybit} alt="" />
            </div>
            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={SPYDERswooshbat_PurpleBlue_onBlackChrome} alt="" />
            </div>
            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={HV_HEIMDALLdata_vikingfire_chromeOutline} alt="" />
            </div>
            <div className="flex justify-center">
              <img className="h-auto max-w-full rounded-lg" src={HV_NATsec_unicorn_stickercut_blackChrome} alt="" />
            </div>
            {/* Add more <div> elements for each image */}
          </div>

          {/*    */}
          <div className="flex  bg-transparent   ">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-1 justify-ter -mt-24 p-16">

              <div className="  justify-center ">
                <img className="h-auto max-w-full rounded-lg" src={HVbsideslogointro} alt="" />
              </div>

              <div className="  justify-center">
                <img className="h-auto max-w-full  " src={DC719jack} alt="" />
              </div>

              <div className="flex justify-center items-start">
    <img className="h-auto max-w-full rounded-lg" src={SAEPiologo_stickercut} alt="" />
</div>


            </div>
          </div>
            <div className="caption-area text-center bg-transparent pb-24  ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' > Submerge into the HACKERverse®</Link>
      </div>


          <Quote />

          {/* two pics */}
          <div className="col-md-12 py-10  bg-transparent   ">
            <div className="content-are">
              <article>
                <div className="primary-heading">
                  <div className="title-lg mt-3 hover-underline">
                    Our Killer POC
                    <sup>
                      <span className="" style={{ fontSize: 15 }}>
                        TM
                      </span>
                    </sup>{" "}
                    Interface!
                  </div>
                </div>
              </article>
            </div>
            <section className="text-gray-600 body-font">
              <div className="container px- py-[20px] mx-auto ">
                <div className=" ">
                  <img
                    src={BLUMIRApocscreen}
                    height="100px"
                    width="auto"
                    className="demo-image rounded-3xl"
                  />
                </div>
              </div>
            </section>
                <div className="caption-area text-center bg-transparent mt-20  ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' > Skull Jack the HACKERverse® </Link>
      </div>
            {/*  */}
            {/*  */}
            <div className="col-md-12 py-10">
              <div className="content-are">

                <article>
                  <div className="primary-heading pt-24">
                    <div className="title-lg mt-3 hover-underline">
                      How it Works
                    </div>
                  </div>
                </article>
              </div>
              <section className="text-gray-600 body-font">
                <div className="container px- py-[20px] mx-auto ">
                  <div className=" ">
                    <img
                      src={HV_NEW_AI_Machine}
                      height="100px"
                      width="auto"
                      className="demo-image rounded-3xl"
                    />
                  </div>
                </div>
              </section>
              <div className="caption-area text-center bg-transparent mt-24  ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[12px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' >  Immerse yourself in the HACKERverse® </Link>
      </div>
      
              {/* <TwoButtons /> */}
              <Paragraph />
              <Testimonials />
              <Index />
              <div className="col-md-12  ">
                <Blogs />
                <Spotify />
                <PodcastVideo />

                <Newsletter />

                <Footer />
                {/* <DialogflowMessenger/> */}
                <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/966f7b93-5e51-4195-86e2-96bd13ed377e"></iframe>

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="speak   "  >
        <div className="sup-icons-cont">
          <a href="https://discord.gg/hacer-rs-952244889192648775" target="_blank">
            <div className="sup-icon">
              <img src={redorbdiscord} />
            </div>
          </a>
          <a href="https://www.instagram.com/_hackerverse_/" target="_blank">
            <div className="sup-icon">
              <img src={redorbinsta} />
            </div>
          </a>
          <a href="https://www.youtube.com/@theHACKERverse" target="_blank">
            <div className="sup-icon">
              <img src={redorbyoutube} />
            </div>
          </a>
          <a href="https://www.reddit.com/u/theHACKERverse/" target="_blank">
            <div className="sup-icon">
              <img src={redorbreddit} />
            </div>
          </a>
          <a href="https://www.twitch.tv/thehackerverse" target="_blank">
            <div className="sup-icon">
              <img src={redorbtwitch} />
            </div>
          </a>
          <a href="https://twitter.com/_HACKERverse_" target="_blank">
            <div className="sup-icon">
              <img src={orbtwitter} />
            </div>
          </a>
          {/* <a href="https://www.pinterest.com/thehackerverse/" target="_blank">
    <div class="sup-icon">
      <img src="img/pinterest.svg">
    </div>
  </a>         */}
        </div>
        <div className="sup-rota">
          <img src={SideChat} />
        </div>
        <div className="video-cutter"  >
          <img src={orbmp4} alt="Your GIF" />

        </div>
      </div>

    </>
  )
}

export default index