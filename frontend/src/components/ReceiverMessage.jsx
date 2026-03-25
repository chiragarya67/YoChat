import React from 'react'
import dp from '../assets/dp.webp'

function ReceiverMessage() {
  return (
    <div className='w-fit max-w-[500px] px-[20px] py-[10px] 
       bg-[#e8cd01] text-white text-[19px] 
       rounded-tl-none rounded-2xl relative left-0  
       shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
         <img src={dp} alt="" className='w-[150px] rounded-lg'/>
         <span>hii</span>
       </div>
  )
}

export default ReceiverMessage

