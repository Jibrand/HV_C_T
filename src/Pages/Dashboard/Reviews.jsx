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

const Popup = ({ onClose, fetchReviews, setLoading, isLoading }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [name, setname] = useState('');
    const [designation, setDesignation] = useState('')
    const [category, setCategory] = useState('');
    const [review, setreview] = useState('')


    const handleImageDrop = (event) => {
        setSelectedImage(event.target.files[0])
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage1(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleAddReview = () => {
        if (name == '' || !selectedImage ||  review == '' || designation == '') {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extracting base64 data
            const fileName = selectedImage.name;
            console.log(fileName);
            axios.post(`${Api}/hv-comapny/Reviews/add`, {
                name,
                selectedImage: base64String,
                fileName,
                designation,
                review
            })
                .then(response => {

                    toast.success('Your Reviews is Added Successfully');
                    fetchReviews()
                    onClose()
                    setLoading(false);

                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                    toast.error('Failed to Add');

                });
        };
        reader.readAsDataURL(selectedImage); // Reading selected image as data URL
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
                    {selectedImage ? (
                        <>
                            <div className="image-container bg-gray-200 rounded-lg overflow-hidden h-48 flex justify-center items-center">
                                <img alt="team" className="w-auto h-full object-cover object-center" src={selectedImage1} />
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-100 w-full h-40 flex items-center justify-center mb-4">
                            <label htmlFor="image" className="cursor-pointer">
                                <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageDrop} />
                                <div className="text-center flex flex-col items-center"> {/* Centering content */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="text-gray-500 mt-2">Drag & Drop or Click to Upload Image</p>
                                </div>
                            </label>
                        </div>

                    )}
                </div>


                <div className="mb-6">
                    <input disabled={isLoading} type="text" placeholder="Name" className="w-full border-gray-300 rounded-md p-2" value={name} onChange={(e) => setname(e.target.value)} />
                </div>
          
                <div className="mb-6">
                    <input disabled={isLoading} type="text" placeholder="Designation" className="w-full border-gray-300 rounded-md p-2" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div className="mb-6">
                    <textarea disabled={isLoading} type="text" placeholder="Review...." className="w-full border-gray-300 rounded-md p-2" value={review} onChange={(e) => setreview(e.target.value)} />
                </div>
                <button disabled={isLoading} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleAddReview}>Add Review</button>
            </div>
        </div>
    );
};

const Popup1 = ({ onClose, fetchReviews, ReviewId, setLoadingu, isLoadingu }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [name, setname] = useState('');
    const [designation, setDesignation] = useState('')
    const [category, setCategory] = useState('');
    const [review, setreview] = useState('')

    const handleImageDrop = (event) => {
        setSelectedImage(event.target.files[0])
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage1(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const fetchSingleReview = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Reviews/getsingle/${ReviewId}`);
            const { name } = response.data.review;
            const { designation } = response.data.review;
            const { review } = response.data.review;
            const { pic } = response.data.review;

            setname(name)
            setDesignation(designation)
            setreview(review)
            setSelectedImage1(pic)


        } catch (error) {
            console.error('Error fetching Reviews:', error);
        }
    };
    useEffect(() => {
        fetchSingleReview();
    }, []);

    const handleUpdateReview = async () => {
        setLoadingu(true);
        if (name == ''   || review == '' || designation == '') {
            return
        }
        if (selectedImage != null) {

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(",")[1]; // Extracting base64 data
                const fileName = selectedImage.name;
                console.log(fileName);
                axios.put(`${Api}/hv-comapny/Reviews/update/${ReviewId}`, {
                    name,
                    selectedImage: base64String,
                    fileName,
                    designation,
                    review
                })
                    .then(response => {

                        fetchReviews()
                        setLoadingu(false);
                        onClose()
                        toast.success('Your Reviews is Updated Successfully');
                    })

                    .catch(error => {
                        console.error(error);
                        setLoadingu(false);
                        toast.error('Failed to Add');
                    });
            }
            reader.readAsDataURL(selectedImage); // Reading selected image as data URL
        }
        else {
            axios.put(`${Api}/hv-comapny/Reviews/update/${ReviewId}`, {
                name,
                designation,
                review
            })
                .then(response => {

                    fetchReviews()
                    setLoadingu(false);
                    onClose()
                    toast.success('Your Reviews is Added Successfully');
                })

                .catch(error => {
                    console.error(error);
                    setLoadingu(false);
                    toast.error('Failed to Add');
                });
        }


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

                    <div className="image-container bg-gray-200 rounded-lg overflow-hidden h-48 flex justify-center items-center">
                        <img alt="team" className="w-auto h-full object-cover object-center" src={selectedImage1} />
                    </div>
                    <div className="absolute top-2 right-2 cursor-pointer mt-5 mr-5">
                        <label htmlFor="image" className="cursor-pointer">
                            <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageDrop} />
                            <FontAwesomeIcon icon={faEdit} className='h-6 w-6 bg-gray-300 p-2 rounded-2xl' />
                        </label>
                    </div>

                </div>


                <div className="mb-6">
                    <input disabled={isLoadingu} type="text" placeholder="Name" className="w-full border-gray-300 rounded-md p-2" value={name} onChange={(e) => setname(e.target.value)} />
                </div>
           
                <div className="mb-6">
                    <input disabled={isLoadingu} type="text" placeholder="Designation" className="w-full border-gray-300 rounded-md p-2" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div className="mb-6">
                    <textarea disabled={isLoadingu} type="text" placeholder="Review...." className="w-full border-gray-300 rounded-md p-2" value={review} onChange={(e) => setreview(e.target.value)} />
                </div>
                <button disabled={isLoadingu} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleUpdateReview}>Update Review</button>
            </div>
        </div>
    );
};
function Dashboard() {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupOpen1, setPopupOpen1] = useState(false);
    const [messages, setMessages] = useState('')
    const [Reviews, setReviews] = useState([]);
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



    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Reviews/getall`);
            setReviews(response.data);

        } catch (error) {
            console.error('Error fetching Reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (ReviewId) => {
        try {
            setLoadingd(true)
            await axios.delete(`${Api}/hv-comapny/Reviews/delete/${ReviewId}`);
            setReviews(Reviews.filter(Review => Review._id !== ReviewId));
            toast.success('Deleted Successfully')
            setLoadingd(false)
        } catch (error) {
            console.error('Error deleting Review:', error);
            setLoadingd(false)
        }
    };

    const closePopup = () => { setPopupOpen(false); };
    const closePopup1 = () => { setPopupOpen1(false); };
    const openPopup = () => { setPopupOpen(true); };
    const [selectedReviewId, setSelectedReviewId] = useState(null); // Track selected Review ID

    const seeSingleData = (ReviewId) => {
        setSelectedReviewId(ReviewId); // Set the selected Review ID
        setPopupOpen1(true); // Open the popup
    };

    const handleUpdate = (ReviewId) => {
        setSelectedReviewId(ReviewId); // Set the selected Review ID
        setPopupOpen1(true); // Open the popup
    };


    return (

        <div>
            {isPopupOpen && <Popup onClose={closePopup} fetchReviews={fetchReviews} setLoading={setLoading} isLoading={isLoading} />}
            {isPopupOpen1 && <Popup1 onClose={() => setPopupOpen1(false)} ReviewId={selectedReviewId} fetchReviews={fetchReviews} setLoadingu={setLoadingu} isLoading={isLoading} />}
            {isLoading && <Loader text={('Adding the Review')} />}
            {isLoadingu && <Loader text={('Updating the Review')} />}
            {isLoadingd && <Loader text={('Deleting the Review')} />}

            <div className="flex flex-col mt-6 containera  mx-auto">
                <div className="overflow-hidden border-b border-gray-200 rounded-md">
                    <h3 className="mt-6 text-2xl font-semibold pt-7 text-gray-400 hover-underline">Testimonials  </h3>
                    <div className="flex justify-end">
                        <button className='bg-[#8cc230] text-black rounded-md p-2 font-medium hover:bg-[#a0ff00]' onClick={openPopup} >Add New +</button>
                    </div>
                    <section className=" text-white body-font">
                        <section className="text-gray-600 body-font">
                            <div className="containera px-5 py- mx-auto">

                                {Reviews.length === 0 ? ( // Check if there are no Reviews
                                    <div className="flex justify-center items-center h-64">
                                        <p className="text-xl text-gray-300">No Reviews available</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {Reviews.map((testimonial) => (
                                            <div className="max-w-xl mt-12 mx-auto p-4 mb-4 cursor-pointer picbox1 rounded-2xl ">
                                                <div className="flex flex-col items-center text-center ">
                                                    <img src={testimonial.pic} className="w-28 h-28 rounded-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.6)] border-2 border-white" />
                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-extrabold text-white">{testimonial.name}</h4>
                                                        <p className="text-xs text-[#a0ff00] font-bold mt-1">{testimonial.designation}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <p className="text-sm leading-relaxed text-gray-400">{testimonial.review} </p>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <button className="bg-gray-600 text-white rounded-md p-2 font-medium hover:bg-gray-800" onClick={() => handleUpdate(testimonial._id)}> <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update </button>
                                                    <button className="bg-red-600 text-white rounded-md p-2 font-medium hover:bg-red-800" onClick={() => handleDelete(testimonial._id)}> <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete </button>
                                                </div>

                                            </div>
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
