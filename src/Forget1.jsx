import React, { useEffect, useState,useContext } from 'react';
import logo from './img/logo.svg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import Loader from './Pages/Loading';
import Cookies from 'js-cookie';
import { Api } from './Api/Api';
import { useNavigate } from 'react-router-dom';

const Forget1 = () => {
//       const [theme, setTheme] = useState(() => {
//     const savedTheme = Cookies.get('theme');
//     return savedTheme || 'dark'; // Set default theme as 'dark' if none saved
//   }); 
const {theme, setTheme} =('')
const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false)

    // useEffect(() => {
    //     const getThemeFromCookie = () => {
    //         const themeCookie = document.cookie
    //             .split('; ')
    //             .find((row) => row.startsWith('theme='))
    //             ?.split('=')[1];
    //         if (themeCookie) {
    //             setTheme(themeCookie);
    //         }
    //     };

    //     getThemeFromCookie();
    // }, []);

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please Fill the fields Properly');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email format');
            return;
        }
        try {
            setloading(true);
            const response = await axios.post(`${Api}/hv-comapny/User/emailForPasRst`, { email });
            await toast.promise(new Promise((resolve) => { setTimeout(() => { resolve(); }, 1000); }), { loading: 'Wait...', success: 'Reset Email sent Successfully', error: 'Error', });
            setloading(false);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('User Not found');
            } else {
                console.error('Error:', error.message);
                toast.error('This Email does not exist');
            }
            setloading(false);
        }
    };
    

    return (
        <>
          {loading? <Loader text="please Wait"/>  :<></>}
            <section className=" ">
                <div className={`flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0   `}>
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-48 h-w-48 mr-2" src={logo}alt="logo" />
                         
                    </a>
                    <div className={`w-full bg-gray-900  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 `}>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className={`text-xl font-bold leading-tight tracking-tight   md:text-2xl text-gray-200`}> Enter your Email </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className={`block mb-2 text-sm font-medium    text-gray-400`} > Your email </label>
                                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={handleSubmit} className="w-full font-semibold text-black bg-[#a0ff00] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" > Send Email </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    );
};



export default Forget1