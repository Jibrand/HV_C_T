// Loader.js
import React from 'react';
import CustomLoaderSVG from '../img/support.svg'; // Import your custom SVG file

const Loader = ({text}) => {
    return (
        <div className="loader-overlay">
            <div className="loader-container text-center">
                <p className="text-2xl text-white mb-4 "><i>{text}</i></p>
                <div className="centered ml-12">
                    <img src={CustomLoaderSVG} alt="Custom Loader" className="justify-center   animate-spin h-12 w-12" />
                </div>
            </div>
        </div>
    );
};

export default Loader;




