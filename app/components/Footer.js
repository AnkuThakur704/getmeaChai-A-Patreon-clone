import React from 'react'

const Footer = () => {
  return (
    <div className='absolute bottom-0 w-full h-[45px] flex justify-center items-center
      text-[13px] text-gray-300 backdrop-blur-md bg-white/10 border-t border-white/20
      shadow-[0_0_20px_rgba(255,255,255,0.05)] '>
      <p className='tracking-wide hover:text-amber-400 transition-colors duration-300'> © {new Date().getFullYear()} BuymeaChai — All rights reserved.</p>
    </div>
  )
}

export default Footer
