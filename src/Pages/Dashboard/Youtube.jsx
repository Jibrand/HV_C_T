import React, { useState, useEffect, useContext, useRef } from 'react';
import Sidebar from './Sidebar';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo.svg'
import axios from 'axios'
import { Api } from '../../Api/Api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loading'
import Cookies from 'js-cookie';

const Popup = ({ onClose, fetchVodcasts, setLoading, isLoading }) => {

    const [link, setlink] = useState('')

    const handleAddVodcast = () => {
        if (link == '') {
            toast.error('Please fill the field');
            return;
        }
        setLoading(true);


        axios.post(`${Api}/hv-comapny/youtube/add`, {
            link
        })
            .then(response => {

                toast.success('Your Vodcasts is Added Successfully');
                fetchVodcasts()
                onClose()
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                toast.error('Failed to Add');
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0  bg-transparent  opacity-55"></div>
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full relative picbox1 cursor-pointer">
                <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a0ff00] hover:text-[#a0ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="mb-6">
                    <textarea disabled={isLoading} type="text" placeholder="Vodcast Embedded Link...." className="w-full border-gray-300 rounded-md p-2" value={link} onChange={(e) => setlink(e.target.value)} />
                </div>
                <button disabled={isLoading} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleAddVodcast}>Add Vodcast Video</button>
            </div>
        </div>
    );
};

const Popup1 = ({ onClose, fetchVodcasts, VodcastId, setLoadingu, isLoadingu }) => {

    const [link, setlink] = useState('')

    const fetchSingleVodcast = async () => {
        try {
            alert(VodcastId)
            const response = await axios.get(`${Api}/hv-comapny/youtube/getsingle/${VodcastId}`);
            console.log(response.data);
            const { link } = response.data.Youtube;
            setlink(link)

        } catch (error) {
            console.error('Error fetching Vodcasts:', error);
        }
    };

    useEffect(() => {
        fetchSingleVodcast();
    }, []);

    const handleUpdateVodcast = async () => {
        setLoadingu(true);
        if (link === '') {
            return
        }


        axios.put(`${Api}/hv-comapny/youtube/update/${VodcastId}`, {
            link
        })
            .then(response => {

                fetchVodcasts()
                setLoadingu(false);
                onClose()
                toast.success('Your Vodcasts is Added Successfully');
            })

            .catch(error => {
                console.error(error);
                setLoadingu(false);
                toast.error('Failed to Add');
            });

    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0  bg-transparent  opacity-55"></div>
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full relative picbox1 cursor-pointer">
                <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a0ff00] hover:text-[#a0ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="mb-6">
                    <textarea disabled={isLoadingu} type="text" placeholder="Vodcast...." className="w-full border-gray-300 rounded-md p-2" value={link} onChange={(e) => setlink(e.target.value)} />
                </div>
                <button disabled={isLoadingu} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleUpdateVodcast}>Update Vodcast</button>
            </div>
        </div>
    );
};
function Dashboard() {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupOpen1, setPopupOpen1] = useState(false);
    const [messages, setMessages] = useState('')
    const [Vodcasts, setVodcasts] = useState([]);
    const [category, setcategory] = useState([]);
    const [isLoading, setLoading] = useState(false); // State for loading indicator
    const [isLoadingu, setLoadingu] = useState(false); // State for loading indicator
    const [isLoadingd, setLoadingd] = useState(false); // State for loading indicator
    const navigate = useNavigate()

    useEffect(() => {
        if (Cookies.get('token') == null) {
            toast.error('Please Login to access this page.')
            navigate('/login')
        }
        handleCheck(Cookies.get('token'))
    }, [])

    const handleCheck = async (token) => {
        try {
            const response = await axios.post(`${Api}/hv-comapny/User/VerifyUser/${token}`);

            if (response.status === 200) {
            } else {
                // Handle other status codes
                console.error('Error:', response.data);
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')
        } finally {
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

    const handleDelete = async (VodcastId) => {
        try {
            setLoadingd(true)
            await axios.delete(`${Api}/hv-comapny/youtube/delete/${VodcastId}`);
            setVodcasts(Vodcasts.filter(Vodcast => Vodcast._id !== VodcastId));
            toast.success('Deleted Successfully')
            setLoadingd(false)
        } catch (error) {
            console.error('Error deleting Vodcast:', error);
            setLoadingd(false)
        }
    };

    const closePopup = () => { setPopupOpen(false); };
    const closePopup1 = () => { setPopupOpen1(false); };
    const openPopup = () => { setPopupOpen(true); };
    const [selectedVodcastId, setSelectedVodcastId] = useState(null); // Track selected Vodcast ID

    const seeSingleData = (VodcastId) => {
        setSelectedVodcastId(VodcastId); // Set the selected Vodcast ID
        setPopupOpen1(true); // Open the popup
    };

    const handleUpdate = (VodcastId) => {
        setSelectedVodcastId(VodcastId); // Set the selected Vodcast ID
        setPopupOpen1(true); // Open the popup
    };


    return (

        <div>
            {isPopupOpen && <Popup onClose={closePopup} fetchVodcasts={fetchVodcasts} setLoading={setLoading} isLoading={isLoading} />}
            {isPopupOpen1 && <Popup1 onClose={() => setPopupOpen1(false)} VodcastId={selectedVodcastId} fetchVodcasts={fetchVodcasts} setLoadingu={setLoadingu} isLoading={isLoading} />}
            {isLoading && <Loader text={('Adding the Vodcast')} />}
            {isLoadingu && <Loader text={('Updating the Vodcast')} />}
            {isLoadingd && <Loader text={('Deleting the Vodcast')} />}

            <div className="flex flex-col mt-6 containera  mx-auto">
                <div className="overflow-hidden border-b border-gray-200 rounded-md">
                    <h3 className="mt-6 text-2xl font-semibold pt-7 text-gray-400 hover-underline">Vodcast Video  </h3>
                    <div className="flex justify-end">
                        <button className='bg-[#8cc230] text-black rounded-md p-2 font-medium hover:bg-[#a0ff00]' onClick={openPopup} >Add New +</button>
                    </div>
                    <section className=" text-white body-font">
                        <section className="text-gray-600 body-font">
                            <div className="containera px-5 py- mx-auto">

                                {Vodcasts.length === 0 ? ( // Check if there are no Vodcasts
                                    <div className="flex justify-center items-center h-64">
                                        <p className="text-xl text-gray-300">No Vodcast Video available</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {Vodcasts.map((Video) => (
                                            <>
                                                <section className="text-gray-600 body-font">
                                                    <div className="container px- py-[20px] mx-auto lg:p-32 md:p-32 p-2">
                                                        {/* Vodcast Video Embed */}
                                                        <div className="relative overflow-hidden lg:pt-46 md:pt-46 pt-80">


                                                            {/* Replace 'VIDEO_ID' with your Vodcast video ID */}
                                                            <iframe
                                                                className=" overflow-hidden absolute inset-0 w-full h-full rounded-lg lg:p-32 md:p-32 p-2"
                                                                src={Video.link}
                                                                title="Vodcast Video"
                                                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                                            ></iframe>
                                                             <div className="absolute top-4 right-4 flex space-x-4">
                                                            <button onClick={() => handleUpdate(Video._id)} className="bg-gray-600 text-white rounded-3xl p-2 font-medium hover:bg-gray-800">
                                                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                            </button>
                                                            <button onClick={() => handleDelete(Video._id)} className="bg-red-600 text-white rounded-3xl p-2 font-medium hover:bg-red-800">
                                                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                            </button>
                                                        </div>
                                                        </div>
                                        
                                                    </div>
                                                </section>
                                            </>
                                        ))}

                                    </div>
                                )}
                            </div>
                        </section>
                    </section>
                </div>
            </div>

            <Toaster />
        </div>
    );
}

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => { setSidebarOpen(!isSidebarOpen); };

    return (
        <div className="flex h-screen">

            {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'} `}>
                <header className="bg-gray-900 text-white p-4 roune fixed w-full z-10 ">
                    <div className="flex items-center">
                        <div> <button onClick={toggleSidebar} className="focus:outline-none mr-4"> <svg className={`w-6 h-6 transition-transform transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path> </svg> </button> </div>
                        <div> <h1 className="text-2xl font-bold"><img className="w-48 h-w-48 mr-2" src={logo} alt="logo" /></h1> </div>
                    </div>
                </header>
                <main className="p-4 rounded-b"> <Dashboard /> </main>
            </div>
        </div>
    );
}

export default App;
