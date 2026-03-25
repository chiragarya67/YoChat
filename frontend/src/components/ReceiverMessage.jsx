import React, { useEffect, useRef } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'

function ReceiverMessage({image, message}) {
   const scroll = useRef()
   let {selectedUser} = useSelector(state=>state.user)
    useEffect(() => {
      scroll?.current.scrollIntoView({behavior:"smooth"})
    }, [message, image])

   
  return (
      
    <div className="flex items-start gap-[12px]">
    
     <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg" onClick={() => navigate('/profile')}>
    <img src={selectedUser.image || dp} alt="" className="h-[100%]"/>
   </div>
 
   <div className='w-fit max-w-[500px] px-[20px] py-[9px] 
       bg-[#f5f1f1] text-gray-800 text-[19px]
       rounded-tl-none rounded-2xl relative left-0  
       shadow-gray-400 shadow-lg gap-[10px] flex flex-col' ref={scroll}>
         {image && <img src={image} alt="" className='w-[150px] rounded-lg'/>}
         {message && <span>{message}</span>}
       </div>
        </div>
  )
}

export default ReceiverMessage

