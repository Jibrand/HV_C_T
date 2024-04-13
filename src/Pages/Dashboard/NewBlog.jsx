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
import JoditEditor from 'jodit-react';

const Popup = ({ onClose, fetchBlogs, setLoading, isLoading }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('')

    const editor = useRef(null);

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

    const handleAddBlog = () => {
        if (title == '' || !selectedImage || content == '') {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extracting base64 data
            const fileName = selectedImage.name;
            console.log(fileName);
            axios.post(`${Api}/hv-comapny/Blog/add`, {
                title,
                selectedImage: base64String,
                fileName,
                content,
            })
                .then(response => {

                    toast.success('Your Blog is Added Successfully');
                    fetchBlogs()
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
            <div className="fixed inset-0  bg-transparent  opacity-55"></div>
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full relative picbox1 cursor-poin ter">
                <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#a0ff00] hover:text-[#a0ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="mb-6">
                    {selectedImage ? (
                        <>
                            <div className="image-container bg-gray-200 rounded-lg overflow-hidden h-48 flex justify-center items-center">
                                <img alt="Blog" className="w-auto h-full object-cover object-center" src={selectedImage1} />
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
                    <input disabled={isLoading} type="text" placeholder="Title" className="w-full border-gray-300 rounded-md p-2" value={title} onChange={(e) => settitle(e.target.value)} />
                </div>
                <div className="mb-6">
                    <JoditEditor className='' // Set maximum height to 10px and make it scrollable

                        ref={editor}
                        value={content}
                        onChange={newContent => { setcontent(newContent) }}
                    />
                    {/* <textarea disabled={isLoading} type="text" placeholder="Content...." className="w-full border-gray-300 rounded-md p-2" value={content} onChange={(e) => setcontent(e.target.value)} /> */}
                </div>
                <button disabled={isLoading} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleAddBlog}>Add Blog</button>
            </div>
        </div>
    );
};

const Popup1 = ({ onClose, fetchBlogs, BlogId, setLoadingu, isLoadingu }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('')

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

    const fetchSingleBlog = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Blog/getsingle/${BlogId}`);
            const { content } = response.data.Blog;
            const { title } = response.data.Blog;
            const { pic } = response.data.Blog;

            setcontent(content)
            settitle(title)
            setSelectedImage1(pic)


        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    };
    useEffect(() => {
        fetchSingleBlog();
    }, []);

    const handleUpdateBlog = async () => {
        setLoadingu(true);
        if (title == '' || content == '') {
            return
        }
        if (selectedImage != null) {

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(",")[1]; // Extracting base64 data
                const fileName = selectedImage.name;
                console.log(fileName);
                axios.put(`${Api}/hv-comapny/Blog/update/${BlogId}`, {
                    title,
                    selectedImage: base64String,
                    fileName,
                    content,

                })
                    .then(response => {

                        fetchBlogs()
                        setLoadingu(false);
                        onClose()
                        toast.success('Your Blogs is Updated Successfully');
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
            axios.put(`${Api}/hv-comapny/Blog/update/${BlogId}`, {
                title,
                content,
            })
                .then(response => {

                    fetchBlogs()
                    setLoadingu(false);
                    onClose()
                    toast.success('Your Blogs is Added Successfully');
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
                        <img alt="Blog" className="w-auto h-full object-cover object-center" src={selectedImage1} />
                    </div>
                    <div className="absolute top-2 right-2 cursor-pointer mt-5 mr-5">
                        <label htmlFor="image" className="cursor-pointer">
                            <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageDrop} />
                            <FontAwesomeIcon icon={faEdit} className='h-6 w-6 bg-gray-300 p-2 rounded-2xl' />
                        </label>
                    </div>

                </div>


                <div className="mb-6">
                    <input disabled={isLoadingu} type="text" placeholder="Title" className="w-full border-gray-300 rounded-md p-2" value={title} onChange={(e) => settitle(e.target.value)} />
                </div>
                <div className="mb-6">
                    <textarea disabled={isLoadingu} type="text" placeholder="Content...." className="w-full border-gray-300 rounded-md p-2" value={content} onChange={(e) => setcontent(e.target.value)} />
                </div>

                <button disabled={isLoadingu} className=" bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-600 w-full" onClick={handleUpdateBlog}>Update Blog</button>
            </div>
        </div>
    );
};
function Dashboard() {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupOpen1, setPopupOpen1] = useState(false);
    const [messages, setMessages] = useState('')
    const [Blogs, setBlogs] = useState([]);
    const [category, setcategory] = useState([]);
    const [isLoading, setLoading] = useState(false); // State for loading indicator
    const [isLoadingu, setLoadingu] = useState(false); // State for loading indicator
    const [isLoadingd, setLoadingd] = useState(false); // State for loading indicator
    const [isLoadinglogin, setisLoadinglogin] = useState(true); // State for loading indicator
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



    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${Api}/hv-comapny/Blog/getall`);
            setBlogs(response.data);

        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (BlogId) => {
        try {
            setLoadingd(true)
            await axios.delete(`${Api}/hv-comapny/Blog/delete/${BlogId}`);
            setBlogs(Blogs.filter(Blog => Blog._id !== BlogId));
            toast.success('Deleted Successfully')
            setLoadingd(false)
        } catch (error) {
            console.error('Error deleting Blog:', error);
            setLoadingd(false)
        }
    };

    const closePopup = () => { setPopupOpen(false); };
    const closePopup1 = () => { setPopupOpen1(false); };
    const openPopup = () => { setPopupOpen(true); };
    const [selectedBlogId, setSelectedBlogId] = useState(null); // Track selected Blog ID

    const seeSingleData = (BlogId) => {
        setSelectedBlogId(BlogId); // Set the selected Blog ID
        setPopupOpen1(true); // Open the popup
    };

    const handleUpdate = (BlogId) => {
        setSelectedBlogId(BlogId); // Set the selected Blog ID
        setPopupOpen1(true); // Open the popup
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('')

    const editor = useRef(null);

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

    const handleAddBlog = () => {
        if (title == '' || !selectedImage || content == '') {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extracting base64 data
            const fileName = selectedImage.name;
            console.log(fileName);
            axios.post(`${Api}/hv-comapny/Blog/add`, {
                title,
                selectedImage: base64String,
                fileName,
                content,
            })
                .then(response => {

                    toast.success('Your Blog is Added Successfully');
                    setLoading(false);
                    navigate('/blog')

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

        <div>
            {isPopupOpen && <Popup onClose={closePopup} fetchBlogs={fetchBlogs} setLoading={setLoading} isLoading={isLoading} />}
            {isPopupOpen1 && <Popup1 onClose={() => setPopupOpen1(false)} BlogId={selectedBlogId} fetchBlogs={fetchBlogs} setLoadingu={setLoadingu} isLoading={isLoading} />}
            {isLoading && <Loader text={('Adding the Blog')} />}
            {isLoadingu && <Loader text={('Updating the Blog')} />}
            {isLoadingd && <Loader text={('Deleting the Blog')} />}


            <div className="flex flex-col mt-6 containera  mx-auto">
                <div className="overflow-hidden border-b border-gray-200 rounded-md">
                    <h3 className="mt-6 text-2xl font-semibold pt-7 text-gray-400 hover-underline">New Blog  </h3>
                    <div className="flex justify-end">
                        <button className='bg-[#8cc230] text-black rounded-md p-2 font-medium hover:bg-[#a0ff00]' onClick={handleAddBlog} >Add New Blog</button>
                    </div>
                    <section className=" text-white body-font">
                        <section className="text-gray-600 body-font">
                            <div className="containera px-5 py- mx-auto">

<div className='mt-10'>
                                <div className="mb-3">
                                    {selectedImage ? (
                                        <>
                                            <div className="image-container bg-gray-200 rounded-lg overflow-hidden h-48 flex justify-center items-center">
                                                <img alt="Blog" className="w-auto h-full object-cover object-center" src={selectedImage1} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="bg-gray-100 w-full h-36 flex items-center justify-center mb-4 rounded-2xl">
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


                                <div className="mb-3">
                                    <input disabled={isLoading} type="text" placeholder="Title" className="w-full border-gray-300 rounded-md p-2" value={title} onChange={(e) => settitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <JoditEditor className='rounded-2xl' // Set maximum height to 10px and make it scrollable

                                        ref={editor}
                                        value={content}
                                        onChange={newContent => { setcontent(newContent) }}
                                    />
                                    {/* <textarea disabled={isLoading} type="text" placeholder="Content...." className="w-full border-gray-300 rounded-md p-2" value={content} onChange={(e) => setcontent(e.target.value)} /> */}
                                </div>
                            </div>
                            {content }
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
