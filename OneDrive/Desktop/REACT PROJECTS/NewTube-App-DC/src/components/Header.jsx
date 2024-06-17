import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import ytLogo from '../images/yt-logo.png';
import ytLogoMobile from '../images/yt-logo-mobile.png';

import { BiMenu } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io'
import { RiVideoAddLine } from 'react-icons/ri'
import { FiBell } from 'react-icons/fi'
import { CgClose } from 'react-icons/cg'

import { Context } from '../context/contextApi'
import Loader from '../shared/Loader'

const Header = () => {

  const [searchQuery, setsearchQuery] = useState("");

  const { Loading, mobileMenu, setmobileMenu } = useContext(Context);
  const Navigate = useNavigate();

  const searchQueryHandle = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
      Navigate(`/searchresult/${searchQuery}`);
    }
  }
  const mobileToggleHandle = () => {
    setmobileMenu(!mobileMenu);
  }

  const { pathname } = useLocation();
  const pagename = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className='sticky top-[0%] z-10 h-[50px] flex flex-row justify-between items-center  bg-black px-1  md:px-10 dark:bg-black'>
      {Loading && <Loader  />}
      <div className='flex items-center h-5'>
        {pagename !== 'video' && (
          <div className='flex md:hidden md:mr-6 cursor-pointer justify-center items-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'
            onClick={mobileToggleHandle}
            >
            {
              mobileMenu
                ? (<CgClose className='text-white text-xl' />)
                : (<BiMenu className='text-white text-xl' />)
            }

          </div>
        )}
        <Link to={'/'} className='flex items-center h-5'>
          <img className='h-full hidden md:block' src={ytLogo} alt="youTubelogo" />
          <img className='h-full md:hidden' src={ytLogoMobile} alt="youtubeMobileLogo" />
        </Link>
      </div>
      <div className='group flex items-center'>
        <div className='flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
          <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
            <IoIosSearch className='text-white text-xl' />
          </div>
          <input
            type='text'
            className='bg-transparent outline-none text-white pr-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]'
            onChange={(e) => setsearchQuery(e.target.value)}
            onKeyUp={searchQueryHandle}
            value={searchQuery}
            placeholder="Search"
          />
        </div>
        <button className='w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'
        onClick={()=> searchQueryHandle("searchButton")}
        >
          <IoIosSearch className='text-white text-xl' />
        </button>
      </div>
      <div className='flex items-center'>
        <div className='hidden md:flex'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
              <RiVideoAddLine className='text-white text-xl cursor-pointer' />
            </div>
            <div className='flex items-center ml-2 justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
              <FiBell className='text-white text-xl cursor-pointer' />
            </div>
            <div className='flex h-8 w-8 overflow-hidden rounded-full md:ml-4'>
                <img src="https://xsgames.co/randomusers/assets/avatars/male/40.jpg" alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header
