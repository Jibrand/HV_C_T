import React, { useState, useEffect, useContext, useRef } from 'react';
import Sidebar from './Sidebar';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo.svg'
import Cookies from 'js-cookie';



function Dashboard() {



  return (
    <div>
      <div className="flex flex-col mt-6 containera  mx-auto">
        <div className="overflow-hidden border-b border-gray-200 rounded-md">
          <h3 className="mt-6 text-2xl font-semibold pt-7 ">Your Products  </h3>
          <div className="flex justify-end">
            <button className=' bg-transparent  text-white rounded-md p-2 font-medium hover:bg-slate-800' >Add New +</button>
          </div>
          <section className=" text-white body-font">
            <section className="text-gray-600 body-font">
              <div className="containera px-5 py-14 mx-auto">

                <div className="flex flex-wrap -m-4">
                  <div className="lg:w-[25%] md:w-1/2 w-2/4 mx-auto mb-3 bg-slate-300 hoverBoxShadow rounded-2xl relative cursor-pointer" >
                    <div className="h-full flex flex-col items-center text-center bg-gray-100 rounded-lg p-3 ">
                      <div className="image-container bg-gray-200 rounded-lg overflow-hidden h-48 flex justify-center items-center">
                        <img alt="team" className="flex-shrink-0 w-auto h-auto object-cover object-center" />
                      </div>
                      <div className="w-full">
                        <h2 className="title-font font-sans font-medium text-[20px] text-gray-900 text-center">item.productName</h2>
                        <h3 className="text-gray-600  text-md italic font-normal text-center">item.category</h3>
                        <h3 className="text-red-600  text-md font-bold text-left font-sans">Rs item.productPrice</h3>
                      </div>

                      <div className="absolute top-2 right-2 flex">
                        <button className="text-red-500 hover:text-red-700 mr-2 bg-gray-300 pt-1 pb-1 pl-2 pr-2 rounded-2xl"  >
                          {/* <FontAwesomeIcon icon={faTrash} /> */}
                        </button>
                        <button className="text-blue-500 hover:text-blue-700 bg-gray-300 pt-1 pb-1 pl-2 pr-2 rounded-2xl" >
                          {/* <FontAwesomeIcon icon={faEdit} /> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </section>
        </div>
      </div>
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
