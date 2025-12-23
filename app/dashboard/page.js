"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { fetchuser, updateProfile } from "@/actions/useractions"
import { ToastContainer, toast } from 'react-toastify';
const page = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})
  useEffect(() => {
    if (!session) {

      router.push("/login")
    }
    else {
      console.log(session.user.name)
      getdata()
    }
  }, [router, session])

  const getdata = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    update()
    updateProfile(e, session.user.name)
    toast('Pofile saved successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" text-white flex flex-col justify-center items-center w-full mt-[40px] gap-[30px] ">
        <div  className="">
          <div>
          <p className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Update Profile</p>
        </div>
        <form action={handlesubmit} className="w-[500px] max-w-lg bg-white/10 backdrop-blur-md rounded-2xl border border-white/10  p-8 shadow-xl space-y-6 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-[15px]">
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Name</p>
              <input value={form.name ? form.name : ""} onChange={handlechange} type="text" name="name" id="name" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="Full name" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Email</p>
              <input value={form.email ? form.email : ""} readOnly type="email" name="email" id="email" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Username</p>
              <input value={form.username ? form.username : ""} readOnly type="text" name="username" id="username" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Profile Picture</p>
              <input value={form.profilepic ? form.profilepic : ""} onChange={handlechange} type="text" name="profilepic" id="profilepic" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="pic" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Cover Picture</p>
              <input value={form.
                coverpic ? form.
                coverpic : ""} onChange={handlechange} type="text" name="coverpic" id="cover" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="Cover Picture" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p className="text-sm font-semibold text-cyan-300">Razorpay Id</p>
              <input value={form.
                razorpayid ? form.
                razorpayid : ""} onChange={handlechange} type="text" name="razorpayid" id="razorpay" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' placeholder="Razorpay ID" />
            </div>
            <div className="flex flex-col space-y-2 w-[400px] ">
              <p className="text-sm font-semibold text-cyan-300">Razorpay Secret</p>
              <input value={form.
                razorpaysecret ? form.
                razorpaysecret : ""} onChange={handlechange} type="text" name="razorpaysecret" id="razorpay" className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70'  />
            </div>
            <div className="flex flex-col space-y-2 w-[400px]">
              <p   className="text-sm font-semibold text-cyan-300">About your content</p>
              <input value={form.
                description ? form.
                description : ""} onChange={handlechange} className='w-full p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' type="text" name="description" id="description" />
            </div>
            <button type="submit" className='w-full py-3 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg'>Save</button>
          </div>
        </form>
        <div className="h-[133px]"></div>
        </div>

      </div></>
  )
}

export default page


