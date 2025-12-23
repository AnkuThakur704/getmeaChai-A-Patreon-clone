"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { initiate } from '@/actions/useractions'
import Script from 'next/script'
import { fetchuser } from '@/actions/useractions'
import { fetchpayments } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { fetchALLpayments } from '@/actions/useractions'
import Posts from './Posts'


const Paymentpage = ({ username }) => {
    const [currentuser, setcurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const [ALLpayments, setALLpayments] = useState([])
    const [paystillnow, setpaystillnow] = useState(0)
    const [raised, setraised] = useState(0)
    let searchparams = useSearchParams()
    let u;
    const router = useRouter()
    const [paymentform, setpaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })
    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        var sum = 0;
        setpaystillnow(ALLpayments.filter(e => e.done).length)
        setraised(ALLpayments.reduce((sum, e) => e.done ? sum + e.amount : sum, 0));

    }, [ALLpayments])


    useEffect(() => {
        getdata()
        if (searchparams.get("paymentDone") === "true") {
            toast('Thanks for the support!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            router.push(`/${username}`)
        }
    }, [])

    const getdata = async () => {
        u = await fetchuser(username)
        // const udata = JSON.parse(JSON.stringify(u))
        setcurrentuser(u)
        let dbpayments = await fetchpayments(username)
        setpayments(JSON.parse(JSON.stringify(dbpayments)))
        let alldbpays = await fetchALLpayments(username)
        setALLpayments(JSON.parse(JSON.stringify(alldbpays)))
    }


    const pay = async (amount) => {
        u = await fetchuser(username)
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        console.log(u)
        const options = {
            key: u.razorpayid, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'BuymeaChai',
            description: 'Test Transaction',
            order_id: orderId, // This is the order_id created in the backend
            callback_url: 'http://localhost:3000/api/razorpay', // Your success URL
            // handler: function (response) {
            //     // Payment success - you can call your API here
            //     console.log('Payment successful:', response);
            //     alert('Payment successful!');
            // },
            prefill: {
                name: paymentform.name,
                email: 'exampleEmail@example.com',
                // contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    let checker = true;
    if (Object.keys(currentuser).length === 0) {
        checker = false;
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='text-white  mt-[-20px] pb-[50px] '>

                <div className='w-full relative flex flex-col items-center justify-center'>
                    {!checker && <> <div className='w-[40vw] h-[40vh] gap-[15px ] bg-gray-500 rounded-[10px] mt-[90px] flex items-center justify-center text-gray-600 font-bold text-[30px]'>
                        <img className='w-[10vw]' src="\noresults.png" alt="" />
                        <p className='ml-[20px]'>No results found</p>
                    </div></>}
                    {checker &&

                        <div className='w-full relative flex flex-col items-center justify-center '>
                            <div className='w-[100vw] h-[40vh] overflow-hidden z-[-1]'><img className='w-[100vw] h-[100vh] object-cover' src={currentuser.coverpic} alt="coverpic" /></div>
                            <div className=' '>
                                <img src={currentuser.profilepic} alt="PFP" className='w-[8vw] h-[8vw] rounded-full mt-[-50px] object-cover  ' />
                            </div>
                            <ul className='flex flex-col justify-center items-center gap-[10px] mt-[15px]'>
                                <li className='font-bold text-3xl'>@{username}</li>
                                <li className='text-gray-400 text-[13px]'>{paystillnow} chai(s) till now • raised ₹{raised / 100}</li>
                                <li className='text-gray-300 text-[13px]'>{currentuser.description}</li>
                            </ul>
                            <div className='flex  justify-center items-center mt-[]'>
                               
                                <div className="payment flex flex-col gap-[20px] items-center justify-center m-[50px]">
                                     <Posts username={username}/>
                                    <div className="w-[500px] max-w-lg bg-white/10 backdrop-blur-md rounded-2xl border border-white/10  p-8 shadow-xl space-y-6 flex flex-col justify-center items-center">
                                        <div>
                                            <p className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 text-[19px]'>Support <b>{username}</b></p>
                                        </div>
                                        <div className='flex flex-col items-center gap-[15px] justify-around '>
                                            <input onChange={handlechange} value={paymentform.name} type="text" name='name' id="amount" placeholder='Name' className={`w-[25vw] inpf p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70 focus:bg-white/5 `} />
                                            <input onChange={handlechange} value={paymentform.message} type="text" name='message' id="amount" placeholder='Message' className='w-[25vw] p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' />
                                            <div className='flex flex-col gap-[10px]'>
                                                <input onChange={handlechange} value={paymentform.amount} type="number" name='amount' id="amount" placeholder='Enter amount(₹)' className='w-[25vw] p-3 rounded-lg text-sm border border-white/10 bg-white/5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 opacity-70' />
                                                <button onClick={() => pay(paymentform.amount * 100)} disabled={paymentform.amount < 1 || paymentform.name.length < 2} className='w-full py-3 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-not-allowed'>Pay</button>
                                            </div>
                                        </div>
                                        <p className='text-center text-[14px] text-gray-500'>OR</p>
                                        <div className='flex flex-col gap-[10px] items-center w-95'>
                                            <button className='w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-not-allowed ' disabled={paymentform.name.length < 2} onClick={() => pay(10000)}>Pay ₹100</button>
                                            <button onClick={() => pay(50000)} disabled={paymentform.name.length < 2} className='w-full py-3 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-not-allowed '>Pay ₹500</button>
                                            <button onClick={() => pay(100000)} disabled={paymentform.name.length < 2} className='w-full py-3 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg disabled:text-gray-500 disabled:hover:scale-100 disabled:hover:cursor-not-allowed '>Pay ₹1000</button>
                                        </div>
                                    </div>
                                    <div className="w-[500px] max-w-lg bg-white/10 backdrop-blur-md rounded-2xl border border-white/10  p-8 shadow-xl space-y-6 flex flex-col justify-center items-center">
                                        <p className='text-[18px] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300'>Supportors' Leaderboard</p>
                                        <ul className='text-gray-400 text-[13px] flex flex-col items-center gap-[5px]'>
                                            {payments.length == 0 && <p>No payments yet</p>}
                                            {payments.map((p, i) => {
                                                if (p.done === true) { return <li key={i}><b>{p.name}</b> supported with <b>₹{p.amount / 100}</b>, says <b>{p.message}</b></li> }

                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}


export default Paymentpage
