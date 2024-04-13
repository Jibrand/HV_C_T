import React, { useEffect, useState, useContext } from 'react';
import logo from '../img/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import  axios  from 'axios'
import { Api } from '../Api/Api'
import Loader from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast,{Toaster} from 'react-hot-toast'
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false)    ;
    const navigate = useNavigate();


    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    const handleSubmit = async (e) => {
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
            const response = await axios.post(`${Api}/hv-comapny/User/signin`, { email, password, ipp });
          
            await toast.promise(new Promise((resolve) => setTimeout(resolve, 500)), {
                loading: 'Logging in...',
                success: 'Login Successful',
                error: 'Error logging in',
            });
            setLoading(false);
            Cookies.set('token', response.data.token, { expires: 1 });
            navigate('/blog');
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 403) {
                // Handle rate limiter message
                toast.error('Error',error);
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

            <section className="   ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-48 h-w-48 mr-2" src={logo} alt="logo" />

                    </a>
                    <div className="w-full   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-gray-800 picbox1">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#a0ff00] md:text-2xl dark:text-white">
                                Sign in
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium `}> Your email </label>
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
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash}  /> : <FontAwesomeIcon icon={faEye} className={``} />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">


                                    </div>
                                    <Link to='/ResetPasswordemail' className="text-sm font-medium text-[#a0ff00] hover:underline hover:text-[#a0ff00]">Forgot password?</Link>
                                </div>
                                <button onClick={handleSubmit} className="w-full font-semibold text-black bg-[#a0ff00] hover:bg-[#a0ff00] focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                            </form>
                        </div>
                    </div>
                </div>
                <Toaster/>
            </section>
        </>
    )
}

export default Login