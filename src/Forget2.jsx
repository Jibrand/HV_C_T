import React, { useEffect, useState,useContext } from 'react';
import logo from './img/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from './Pages/Loading';
import Cookies from 'js-cookie';
import { Api } from './Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Forget2 = () => {
 

    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const {theme, setTheme} =('')

    const navigate = useNavigate()
    const params = useParams()

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

    const isPasswordValid = (value) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
        return passwordRegex.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !password) {
            toast.error('Please Fill the feild Properly');
            return
        }
        if (!isPasswordValid(password)) {
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 7 characters long');
            return;
        }
        try {

            setloading(true)
            const response = await axios.post(`${Api}/hv-comapny/User/reset-password/${params.id}/${params.token}`, {   password });
            await toast.promise(new Promise((resolve) => { setTimeout(() => { resolve( ); }, 500); }), { loading: 'Creating...', success: 'Password Reset Succesfully', error: 'Error', });
            setloading(false)
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === 'Error with token') {
                toast.error('Error with token');
            } else {
                console.error('Error:', error.message);
            }
            setloading(false);
        }
    };

    return (
        <>
            {loading ? <Loader text="please Wait" /> : <></>}
            <section className=" ">
                <div className={`flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  rounded-3xl `}>
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white   rounded-3xl p-3">
                        <img className="w-48 h-w-48 mr-2" src={logo}alt="logo" />
                         
                    </a>
                    <div className={`w-full    rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 picbox1`}>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className={`text-xl font-bold leading-tight tracking-tight   md:text-2xl text-gray-200`}> Reset your Password </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium  text-gray-400`}> Password </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className={`${theme !== 'dark' ? 'text-gray-600' : 'text-gray-800'}`} /> : <FontAwesomeIcon icon={faEye} className={`${theme !== 'dark' ? 'text-gray-600' : 'text-gray-800'}`}/>}
                                    </button>
                                </div>
                                </div>
                                <button onClick={handleSubmit} className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" > Reset Password </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    );
};


export default Forget2