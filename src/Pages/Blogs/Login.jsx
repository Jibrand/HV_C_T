import React, { useEffect, useState, useContext } from 'react';
import bot from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Loader from './Loading';
import Cookies from 'js-cookie';
import { UserContext } from '../context/UserContext';
import { Api } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const savedtheme = Cookies.get('theme');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false);
    const { theme, setTheme ,setLoadingcontext} = useContext(UserContext);
    const [emailSent, setemailSent] = useState(false)
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
useEffect(() => {
    setLoadingcontext(false)
}, [])

    const handleSubmit = async (e) => {
        setemailSent(false)
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please Fill the fields Properly');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email format');
            return;
        }
        try {
            setLoading(true);
            const response1 = await axios.get('https://api.ipify.org?format=json');
            let ipp = response1.data.ip
            const response = await axios.post(`${Api}/auth/signin`, { email, password, ipp });
            if (response.data.result.status !== 'approved')
            {
                setemailSent(true);
                setLoading(false)
                return 
            }
                await toast.promise(new Promise((resolve) => setTimeout(resolve, 500)), {
                    loading: 'Logging in...',
                    success: 'Login Successful',
                    error: 'Error logging in',
                });
            setLoading(false);
            Cookies.set('token', response.data.token, { expires: 1 });
            Cookies.set('name', response.data.result.firstname);
            Cookies.set('id', response.data.result._id);
            navigate(`/${response.data.result._id}`);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 403) {
                // Handle rate limiter message
                toast.error('You Already have active Session');
            }
            else if (error.response && error.response.status === 429) {
                // Handle rate limiter message
                toast.error('Too many login attempts, please try again later.');
            }
            else if (error.response && error.response.data && error.response.data.message) {
                toast.error('Invalid Credentials');
            } else {
                console.error('Login error:', error.message);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        const getIPv4 = async () => {
            try {

            } catch (error) {
                console.error('Error fetching IPv4:', error.message);
            }
        };

        getIPv4(); // Call the function when the component mounts

        // Optionally, you can also clean up when the component unmounts
        return () => {
            // Clean-up code here
        };
    }, []);






    return (
        <>
            {loading ? <Loader text="please Wait" /> : null}
            <section className={`flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ${theme == 'dark' ? ' bg-transparent ' : theme == 'blueNasay' ? 'bg-blue-100' : "bg-white"}`}>
                <a href="#" className={`flex items-center mb-6 text-2xl font-semibold text-${theme === 'dark' ? 'gray-300' : 'gray-900'} dark:text-white`}>
                    <img className={`w-12 h-12 mr-2 bg-${theme === 'dark' ? 'slate-700' : 'slate-300'} rounded-full p-2`} src={bot} alt="logo" /> AI Banker
                </a>
                {emailSent? <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"><svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg><span className="sr-only">Info</span><div className="ms-3 text-sm font-medium">Please Verify your Email  <a href="#" className="font-semibold underline hover:no-underline"> </a>.  </div><button onClick={()=>setemailSent(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close"><span className="sr-only">Close</span><svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg></button></div>:''}  
                <div className={`w-full ${theme == 'dark' ? 'bg-gray-800' : theme == 'blueNasay' ? 'bg-blue-400' : "bg-slate-300"} rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-gray-800 dark:border-gray-700`}>
                  
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={`text-xl font-bold leading-tight tracking-tight md:text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}> Login </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${theme !== 'dark' ? 'text-gray-900' : 'text-gray-300'}`}> Your email </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    id="email"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium ${theme !== 'dark' ? 'text-gray-900' : 'text-gray-300'}`}> Password </label>
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
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className={`${theme !== 'dark' ? 'text-gray-600' : 'text-gray-800'}`} /> : <FontAwesomeIcon icon={faEye} className={`${theme !== 'dark' ? 'text-gray-600' : 'text-gray-800'}`} />}
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Login
                            </button>
                            <div className="text-sm">
                                <label htmlFor="terms" className={`font-medium ${theme !== 'dark' ? 'text-gray-900' : 'text-gray-300'}`}>
                                    Have you <Link to='/reset-password-email' className={`font-medium ${theme !== 'dark' ? 'text-gray-900' : 'text-gray-300'} hover:underline dark:text-primary-500`} href="#"><u>Forget the Password?</u></Link>
                                </label>
                            </div>
                            <br />
                            <Link to='/register' className={`text-sm font-medium ${theme == 'dark' ? 'text-gray-200' : theme == 'blueNasay' ? 'text-gray-900' : "text-slate-800"} `}>
                                Don't have an account?{' '}<a href="#" className="font-extrabold hover:underline  first-letter:">Register here</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
            <Toaster />
        </>
    );
};

export default Login;
