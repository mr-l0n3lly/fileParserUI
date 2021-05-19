import React from 'react'
import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";

import useUser from "../App/useUser";

import './Home.styles.scss'
import {Link} from "react-router-dom";
import FileUpload from "../FileUpload/FileUpload";

const Home = () => {
    const {user, setUser} = useUser()

    return (
        <>

            <main className="px-4 py-16 min-h-screen bg-gray-100">

                <section className="w-full max-w-7xl mx-auto">

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Welcome <br />
                        {user.user.company}
                    </h1>

                    <div className="flex justify-end">
                        <Link
                            className="mr-4 flex items-center rounded-md bg-gray-300 py-3 px-8 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out text-lg font-bold text-gray-600 mt-5"
                            to="/profile"
                        >
                            <span className="mr-1">Profile</span>
                        </Link>
                        <button
                            className="flex items-center rounded-md bg-gray-300 py-3 px-8 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out text-lg font-bold text-gray-600 mt-5"
                            onClick={(e) => {
                                sessionStorage.clear();
                                window.location.href = '/';
                            }}
                        >
                            <span className="mr-1">Logout</span>
                            <span className="w-5 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
					        </span>
                        </button>
                    </div>

                    <FileUpload token={user.token}/>

                </section>
            </main>
        </>
    )
}

export default Home