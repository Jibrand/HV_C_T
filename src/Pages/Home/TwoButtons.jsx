import React from 'react'
import demos from '../../img/demos-icon.svg'
import logo from '../../img/logo.svg'
import { Link } from 'react-router-dom'
import gif1 from '../../img/new/gif.gif'

const Hero = () => {
  return (
    <>
      <div className="caption-area text-center bg-transparent py-20 ">
        <Link to="https://hackerverse.quest/" className="lr-more mx-auto px-3 py-[9px] rounded-md font-semibold bg-[#a0ff00] hover:text-black hover:bg-[#8cba3e] " target='_blank' > Immerse yourself in the HACKERverse® </Link>
      </div>
    </>
  )
}

export default Hero