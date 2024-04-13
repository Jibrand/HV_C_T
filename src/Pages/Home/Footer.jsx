import React from 'react'
import logo from '../../img/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>   <footer className=" bg-transparent    border border-green-400 rounded-2xl picbox1  ">
    <div className="mx-auto w-full max-w-screen-xl p-4 ">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <a href="/" className="flex items-center">
            <img
              src={logo}
              className="h-8 me-3"
              alt="Hackerverse Logo"
            />
            {/* <span class="self-center text-2xl font-semibold whitespace-nowrap ">Hackerverse™</span> */}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#a0ff00] uppercase ">
              Resources
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/" className="hover:underline hover:text-white">
                HACKERverse®
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline hover:text-white">
                Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#a0ff00] uppercase ">
              Follow us
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline hover:text-white">
                  Github
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline hover:text-white">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-[#a0ff00] uppercase ">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/privacyAndPolicy" className="hover:underline hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/t&C" className="hover:underline hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 HACKERverse®. All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:justify-center sm:mt-0">
          <a
            href="https://www.reddit.com/u/theHACKERverse/"
            className="text-gray-500 hover:text-red-100 dar k:hover:text-white"
          >
            <svg
              xmlns="https://www.reddit.com/u/theHACKERverse/"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-reddit "
              viewBox="0 0 16 16"
            >
              <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
            </svg>
            <span className="sr-only">Reddit page</span>
          </a>
          <a
            href="https://www.twitch.tv/thehackerverse"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              xmlns="https://www.twitch.tv/thehackerverse"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-twitch"
              viewBox="0 0 16 16"
            >
              <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z" />
              <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z" />
            </svg>
            <span className="sr-only">Twitch community</span>
          </a>
          <a
            href="https://twitter.com/_HACKERverse_"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="https://twitter.com/_HACKERverse_"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Twitter page</span>
          </a>
          <a
            href="https://www.youtube.com/@theHACKERverse"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              xmlns="https://www.youtube.com/@theHACKERverse"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
            <span className="sr-only">YouTube account</span>
          </a>
          <a
            href="https://discord.gg/hacer-rs-952244889192648775"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              xmlns="https://discord.gg/hacer-rs-952244889192648775"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-discord"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
            </svg>
            <span className="sr-only">Discord account</span>
          </a>
        </div>
      </div>
    </div>
  </footer></>
  )
}

export default Footer