import React,{useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faFilm,faClipboardList,faNewspaper , faHeadphones,faBox, faListAlt, faThumbsUp , faUsers, faCog, faQrcode } from '@fortawesome/free-solid-svg-icons'; // Import icons from Font Awesome
import Cookies from 'js-cookie';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <aside
      className={`w-64 bg-gray-800 text-white transform transition-transform ease-in-out ${isOpen ? '' : 'translate-x-full'
        } fixed h-full overflow-y-auto`}
    >
      <div className="p-4 flex items-center justify-between">
        <Link to="#" className="text-2xl font-bold hover:text-[#A0FF00]">
          Dashboard
        </Link>
      </div>
      <nav className="p-4">
            
            <Link to="/blog" className={`block py-2 rounded-lg transition hover:bg-gray-600 duration-300 pl-4 ${location.pathname === '/blog' ? 'text-gray-100 bg-gray-600  ' : 'text-white'}`}>
              <FontAwesomeIcon icon={faNewspaper } className="mr-2" /> Blogs
            </Link>
            <Link to="/team" className={`block mt-2 py-2 rounded-lg transition duration-300 hover:bg-gray-600 pl-4 ${location.pathname === '/team' ? ' bg-gray-600 text-gray-100' : 'text-white'}`}>
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Team
            </Link>
            <Link to="/Vodcast" className={`block mt-2 py-2 rounded-lg transition duration-300 hover:bg-gray-600 pl-4 ${location.pathname === '/Vodcast' ? 'bg-gray-600 text-gray-100' : 'text-white'}`}>
              <FontAwesomeIcon icon={faFilm} className="mr-2" /> Vodcast Videos
            </Link>
            <Link to="/Spotify" className={`block mt-2 py-2 rounded-lg transition duration-300 hover:bg-gray-600 pl-4 ${location.pathname === '/Spotify' ? ' bg-gray-600 text-gray-100' : 'text-white'}`}>
              <FontAwesomeIcon icon={faHeadphones} className="mr-2" /> Spotify Podcast
            </Link>
            <Link to="/Reviews" className={`block mt-2 py-2 rounded-lg transition duration-300 hover:bg-gray-600 pl-4 ${location.pathname === '/Reviews' ? 'bg-gray-600  text-gray-100' : 'text-white'}`}>
              <FontAwesomeIcon icon={faThumbsUp } className="mr-2" /> Reviews
            </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
