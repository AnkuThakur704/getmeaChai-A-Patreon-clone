"use client"
import React from 'react'
import Script from "next/script";
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
<Script src="https://cdn.lordicon.com/lordicon.js"></Script>
const Navbar = () => {
    const { data: session } = useSession()
    const [drop, setdrop] = useState(false)
    return (
        <>
            <Script src="https://cdn.lordicon.com/lordicon.js"></Script>

            <div className='h-[90px] backdrop-blur-md bg-white/5 border-b border-white/10 text-white  flex justify-between items-center px-4 mb-[15px]'>

                <Link href={`/`}> <div className='flex items-center  text-white font-bold text-[24px] gap-[10px]'>
                    <lord-icon
                        src="https://cdn.lordicon.com/pwbcwjje.json"
                        trigger="loop"
                        stroke="bold"
                        state="hover-steam"
                        colors="primary:#ffffff,secondary:#ffffff"
                        style={{ width: "50px", height: "50px" }}>
                    </lord-icon>
                    <p className='mt-[10px]  text-yellow-400'>BuymeaChai</p>
                </div></Link>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[20px]'>
                    <Link href={'/'}><lord-icon
                        src="https://cdn.lordicon.com/rpvomrgr.json"
                        trigger="hover"
                        stroke="bold"
                        state="hover-partial-roll"
                        style={{ width: "35px", height: "35px" }}>
                    </lord-icon></Link>
                    <a className='' target='_blank' href="https://github.com/AnkuThakur704/getmeaChai-A-Patreon-clone"> <lord-icon
                        src="https://cdn.lordicon.com/acgiczyg.json"
                        trigger="hover"
                        stroke="bold"
                        state="hover-roll"
                        style={{ width: "35px", height: "35px" }}>
                    </lord-icon></a>
                </div>
                <div className='z-50'>
                    {session && <>
                        <button id="dropdownDefaultButton" onClick={
                            () => setdrop(!drop)} data-dropdown-toggle="dropdown" className="text-gray-700 font-bold bg-amber-600  focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-yellow-400 dark:hover:bg-yellow-500 " type="button">Welcome {session.user.name} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>


                        <div id="dropdown" className={`z-[9999] pointer-events-auto ${drop ? "" : "hidden"} bg-white divide-y absolute mt-[10px] ml-[10px] divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 `}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white">Profile</Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => signOut()}>Sign out</a>
                                </li>
                            </ul>
                        </div></>
                    }
                    {!session && <Link href={`/login`}>
                        <button className="hover:cursor-pointer flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-[12px] font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Login
                            </span>
                        </button></Link>}
                </div>
                </div>
            </div></>
    )
}

export default Navbar
