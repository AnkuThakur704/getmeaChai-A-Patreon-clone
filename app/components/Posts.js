'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Script from 'next/script'
import { fetchposts } from '@/actions/useractions'
import { updateposts } from '@/actions/useractions'
const Posts = ({ username }) => {
  const [userallposts, setuserallposts] = useState([])

  const handletest = async () => {
    const req = await fetch("/api/upload", { method: "POST" })
    updateposts(username)
  }

  useEffect(() => {
    async function fetchuserposts() {
    let res = await fetch(`/api/posts/${username}`)
    let userposts = await res.json()
    console.log(userposts)
    setuserallposts(userposts)
  }
    fetchuserposts()
  }, [username])
  

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <div className='w-[55vw] mb-[100px] max-h-[100vh] min-h-[90vh]  bg-white/10 backdrop-blur-md rounded-2xl border border-white/10  p-8 shadow-xl space-y-6 flex flex-col justify-center items-center'>
        <div className='w-[50vw] flex items-center justify-around mt-[20px] '>
          <p className='font-bold text-[23px] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 '>{username}'s Posts</p>
          <input
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            className="hidden"

          />
          <button onClick={handletest}><lord-icon
            src="https://cdn.lordicon.com/mfdeeuho.json"
            trigger="hover"
            stroke="bold"
            style={{ width: "45px", height: "45px" }}>
          </lord-icon></button>

        </div>
        <div className='border border-white/10 w-[50vw]  max-h-[80vh] overflow-y-auto rounded-2xl'>
          <ul className='flex flex-col justify-center gap-[10px] items-center mt-[20px]'>
            {userallposts.map((p, i) => {
              console.log("starts here",i)
              console.log(p)
              return <li key={i}>
                <div><img className='rounded-[5px]' src={p.picture} alt="" /></div>
                <div><p>A visit at the Pond{i}</p></div>
                <div>
                  <div>
                    <button><lord-icon
                      src="https://cdn.lordicon.com/qlrjanhh.json"
                      trigger="morph"
                      stroke="bold"
                      state="morph-slider"
                      style={{ width: "30px", height: "30px" }}>
                    </lord-icon></button>
                    <p></p>
                  </div>

                </div>
              </li>
            })}
          </ul>

        </div>
      </div>
    </>
  )
}

export default Posts
