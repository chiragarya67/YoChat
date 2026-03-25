import React, { useRef } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser,} from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../main';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const MessageArea = () => {
  let { selectedUser, socket } = useSelector(state => state.user)
  let dispatch = useDispatch()
  let [showPicker, setshowPicker] = useState(false)
  let [input, setinput] = useState("")
  let [frontendImg, setFrontendImg] = useState(null)
  let [backendImg, setbackendImg] = useState(null)
  let image = useRef() 
  let {messages}=useSelector(state=>state.message)
  let {userData}=useSelector(state=>state.user)
  let navigate = useNavigate()
  
  const scroll = useRef();
  const handleSendMessage = async (e)=>{
    e.preventDefault()
     try {
      let formData = new FormData()
      formData.append("message", input)
      if(backendImg){
        formData.append("image", backendImg)
      }
       let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, {withCredentials:true} )
        dispatch(setMessages([...messages, result.data]))
        setinput("")
        setFrontendImg(null)
        setbackendImg(null)
        
       
     } catch (error) {
       console.log(error)
     }
  }
  const handleImg =(e) =>{
    let file = e.target.files[0]
    setbackendImg(file)
    setFrontendImg(URL.createObjectURL(file))
  }

  const onEmojiClick =(emojiData)=>{
      setinput(previnput=>previnput+emojiData.emoji)
  }
  
  useEffect(() => {
     socket.on("newMessage",(mess)=>{
     dispatch(setMessages([...messages, mess]))
     })
    return ()=>socket.off("newMessage")
  }, [socket, dispatch])
  
  useEffect(() => {
  scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`lg:w-[70%] relative ${selectedUser? "flex" : "hidden" } lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}>

{selectedUser &&
<div className='w-full h-[100vh] flex flex-col'>
 <div className='w-full h-[100px] bg-[#ffbf01] rounded-b-[30px] shadow-gray-400 shadow-md flex items-center gap-3'>
        <div className='cursor-pointer' onClick={()=>dispatch(setSelectedUser(null))} >
          <IoIosArrowRoundBack className='h-[40px] w-[40px] text-white' />
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => navigate("/profile")}>
          <img src={selectedUser?.image || dp} alt="dp" className='h-[100%] object-cover' />
        </div> <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "User"}</h1>

      </div> 
      <div className='w-full h-[75vh] flex flex-col py-[30px] px-[20px] overflow-auto gap-2'>
       {showPicker &&
       <div className="absolute bottom-[100px] left-[20px] ">
        <EmojiPicker width={250} height={350} className='shadow-lg'onEmojiClick={onEmojiClick}/>
       </div> }

 {messages && messages.map((mess) => (
  <div key={mess._id}>
    {mess.sender == userData._id ? (
      <SenderMessage image={mess.image} message={mess.message} />
    ) : (
      <ReceiverMessage image={mess.image} message={mess.message} />
    )}
  </div>
))}
   
   <div ref={scroll}></div>
      </div>
      </div> }

      {!selectedUser && 
      <div className='w-full h-full flex flex-col justify-center items-center'> 
        <h1 className='text-gray-700 font-bold text-[50px]' >Welcome to Yo-chat</h1>
        <span className='text-gray-700 font-semibold text-[30px]' >Chat with friends</span>
        </div>}
      
      {selectedUser && <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>
      
       <img src={frontendImg} alt="" className='w-[100px] absolute bottom-[100px] right-[10%] rounded-lg shadow-gray-400 shadow-md' />
        <form className='w-[95%] lg:w-[70%]: h-[60px] bg-[#ffbf01] shadow-gray-400 shadow-md rounded-full px-[20px] flex items-center gap-[10px]' onSubmit={handleSendMessage}>
         
        <div className='cursor-pointer' onClick={()=>setshowPicker(prev => !prev)}>
          <RiEmojiStickerLine className='w-[25px] h-[25px] text-white'/>
        </div>
        <input type="file" accept='image/*' hidden ref={image} onChange={handleImg} />
       <input type="text" placeholder='type a message..' className='w-full h-full px-[10px]
       outline-none border-0 text-[19px] text-white placeholder-slate-50 bg-transparent' onChange={ (e)=>setinput(e.target.value)} value={input}/>

       <div onClick={()=>image.current.click()}>
        <CiImageOn className='w-[25px] h-[25px] text-white cursor-pointer' />
       </div>
      <button>
       <IoSend className='w-[25px] h-[25px] text-white' />
      </button>
         </form>
      </div>}
          
    </div>
  )
}

export default MessageArea
