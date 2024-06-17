import React, { useContext,useEffect } from 'react'
import LeftNav from './LeftNav'
import { Context } from '../context/contextApi'
import VideoCard from './VideoCard'
const Feed = () => {
  const {loding,Searchresult} =  useContext(Context);
  useEffect(() => {
   document.getElementById("root").classList.remove("custom-h");
  }, [])

  return (

    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav />
      <div className=" w-[85vw]   h-full overflow-y-auto scrollbar-hide bg-black">
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-5 '>
           {!loding && Searchresult && Searchresult.map((item)=>{
            if(item?.type !== "video") return false;
            return(
              <VideoCard key={item?.video?.videoId} video={item?.video} />
            )
           })

           }
        </div>
      </div>
    </div>
  )
}

export default Feed
