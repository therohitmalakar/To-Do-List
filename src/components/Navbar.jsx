import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-[#ADD9B8] font-bold text-xl border-b-2 border-black">
      <div className="logo p-5">
        <span className='cursor-pointer mx-8 hover:text-white transition-all'>TickDone</span>
      </div>
      <ul className="flex gap-10 p-5">
        <li className='cursor-pointer hidden sm:block'>Home</li>
        <li className='cursor-pointer hidden sm:block'>Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
