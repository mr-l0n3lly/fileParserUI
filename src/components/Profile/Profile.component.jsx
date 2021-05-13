import React, {useEffect, useState} from 'react'

import './Profile.styles.scss'
import {Link} from "react-router-dom";
import useUser from "../App/useUser";

async function loginUser(credentials) {
    try {
        let response = await fetch('http://localhost:3000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': credentials.user.token
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
                firstName: "Andrei",
                lastName: "Pavalachi",
                role: "Admin",
                userEmail: "andreipatana@live.com"

            })
        })

        if (response.status === 200) {
            return response.json()
        } else {
            return null
        }
    } catch (e) {
        console.log(e)
    }
}

const Profile = () => {
    const {user, setUser} = useUser()
    const [message, setMessage] = useState()
    const [companies, setCompanies] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const getCompany = async (user) => {
        try {
            let response = await fetch('http://localhost:3000/api/v1/users/company', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }
            })

            return response
        } catch (e) {

        }
    }

    // useEffect(() => {
    //     getCompany(user).then(data => data.status === 200 ? setCompanies(data.json()) : setCompanies(null))
    // }, [user])

    const registerHandler = async (e) => {
        e.preventDefault()
        const response = await loginUser({
            user,
            username,
            password
        })

        if (!response) {
            setError('Date incorecte')
            setMessage('')
            console.log(response)
        } else {
            console.log(response)
            setMessage('Utilizatorul a fost creat cu success')
            setError('')
        }
    }

    return (
        <>
            <main className="px-4 py-16 min-h-screen bg-gray-100">
                <section className="w-full max-w-7xl mx-auto">
                    <div className="flex justify-end">
                        <Link
                            className="mb-4 flex items-center rounded-md bg-gray-300 py-3 px-8 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out text-lg font-bold text-gray-600 mt-5"
                            to="/"
                        >
                            <span className="mr-1">Home</span>
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-10 sm:px-12 lg:px-24">
                        <div className="flex flex-wrap items-center -mx-3">
                            <div className="w-full lg:w-1/3 px-3">
                                <span className="flex justify-center items-center w-12 h-12">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
						</svg>
						</span>
                                <strong className="text-lg md:text-xl font-bold block mt-9">Numele Prenumele: <span
                                    className="text-gray-600">{user.user.lastName}</span></strong>
                                <strong className="text-lg md:text-xl font-bold block mt-9">Nume utilizator: <span
                                    className="text-gray-600">{user.user.username}</span></strong>
                                <strong className="text-lg md:text-xl font-bold block mt-9">Email: <span
                                    className="text-gray-600">{user.user.userEmail}</span></strong>
                                <strong className="text-lg md:text-xl font-bold block mt-9">Rol: <span
                                    className="text-gray-600">{user.user.role}</span></strong>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mt-9 lg:mt-0">
                                <form>
                                    <strong className="text-lg md:text-xl font-bold">Actualizare parola:</strong>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute left-2 top-1/2 -mt-6">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
									</svg>
								</span>
                                        <input
                                            className="rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            type="password" name="" placeholder="Parola actuala" />
                                    </div>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute left-2 top-1/2 -mt-6">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
									</svg>
								</span>
                                        <input
                                            className="rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            type="password" name="" placeholder="Parola noua" />
                                    </div>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute left-2 top-1/2 -mt-6">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
									</svg>
								</span>
                                        <input
                                            className="rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            type="password" name="" placeholder="Repeta parola" />
                                    </div>
                                    <div className="mt-9">
                                        <button
                                            className="w-full text-center py-3 px-6 rounded-full text-white bg-green-400 hover:bg-blue-600 transition duration-300 ease-in-out">Actualizare
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mt-9 lg:mt-0">
                                <form>
                                    <strong className="text-lg md:text-xl font-bold">Adaugare utilizator:</strong>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute z-10 left-2 top-1/2 -mt-6">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
								</svg>
								</span>
                                        <div className="relative">
                                            <select
                                                className="block appearance-none rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            >
                                                <option>--Numele companiei--</option>
                                                {
                                                    // companies.status ? companies.data.map((item) => {
                                                    //     return (
                                                    //         <option value={item.CompanyID}>{item.CompanyName}</option>
                                                    //     )
                                                    // }) : null
                                                }
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute left-2 top-1/2 -mt-6">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
									</svg>
								</span>
                                        <input
                                            className="rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            type="text" name="" placeholder="Nume utilizator"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="mt-9 relative">
								<span
                                    className="flex justify-center items-center w-12 h-12 p-2 absolute left-2 top-1/2 -mt-6">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
									  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
									</svg>
								</span>
                                        <input
                                            className="rounded-md w-full bg-gray-200 py-3 pl-16 pr-6 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password" name="" placeholder="Parola" />
                                    </div>
                                    <div className="mt-9">
                                        <button
                                            className="w-full text-center py-3 px-6 rounded-full text-white bg-green-400 hover:bg-blue-600 transition duration-300 ease-in-out"
                                            onClick={registerHandler}
                                        >Adauga
                                        </button>
                                    </div>
                                </form>
                                {
                                    message ? (
                                        <p className="text-green-500 text-xs italic">{message}</p>
                                    ) : null
                                }
                                {
                                    error ? (
                                        <p className="text-red-500 text-xs italic">{error}</p>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-10 sm:px-12 lg:px-24 mt-9">
                        <strong className="text-lg md:text-xl font-bold">Istoria încărcărilor:</strong>
                        <table className="w-full text-left mt-9">
                            <thead>
                            <tr>
                                <th className="py-2 px-3 bg-gray-100">Nume prenume</th>
                                <th className="py-2 px-3 bg-gray-100">Data încărcare/ora</th>
                                <th className="py-2 px-3 bg-gray-100">Numărul Total Poliță</th>
                                <th className="py-2 px-3 bg-gray-100">Numărul Total Rbns</th>
                                <th className="py-2 px-3 bg-gray-100">Numărul Total Plăți</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                            </tr>
                            <tr>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                            </tr>
                            <tr>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                                <td className="p-3">Text</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Profile