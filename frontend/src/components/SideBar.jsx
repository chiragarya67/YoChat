import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../main'
import { setsearchData, setSelectedUser, setuserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import useOtherUser from '../customHooks/useOtherUser'

 const SideBar = () => {
  let {searchData ,userData, otherUserData, selectedUser, onlineUser } = useSelector(state => state.user)
  const [input, setinput] = useState("")
  const [search, setSearch] = useState(false)
  let dispatch = useDispatch();
  let navigate = useNavigate()
  const { loading } = useOtherUser()


  useEffect(() => {
  if(input){
     handlesearch()
  }
  
 }, [input])
 
    if (loading || !Array.isArray(otherUserData)) {
   return 
  }


  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setuserData(null))
      dispatch(otherUserData(null))
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

   const handlesearch = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
        dispatch(setsearchData(result.data))
      
  
    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    

    <div className={`lg:w-[30%] w-full h-full overflow-hidden relative lg:block ${!selectedUser? "block" : "hidden" } bg-slate-200`}>
      <div className='w-full h-[280px] bg-[#FFE500] rounded-b-[30%] shadow-gray-400 shadow-md flex flex-col justify-center'>
        <h1 className='text-white font-bold text-[25px] ml-2'>Yo-chat!</h1>

        <div className='w-[45px] h-[45px] rounded-full ml-2 bg-[#FFE500] overflow-hidden  shadow-gray-500 shadow-md flex justify-center items-center cursor-pointer mt-1 absolute bottom-[20px] left-[10px]' onClick={handleLogout} >
          <BiLogOut className='w-[25px] h-[25px] mr-1 ' />
        </div>

    {input.length>0 &&  <div className='flex absolute top-[215px] z-[150] bg-white w-full h-[500px] overflow-y-auto flex-col gap-[10px] pt-[20px] items-center'>
            {searchData?.map((user)=>(
                 <div key={user._id} className='w-[95%] h-[60px] border-b-2 px-[10px] border-gray-500 flex justify-start items-center gap-4 cursor-pointer hover:bg-[#fbff7f]' 
                 onClick={()=>{
                 dispatch(setSelectedUser(user))
                 setinput("")
                 setSearch(false)
                 }
                 }>
            <div className='relative rounded-full '>
            <div key={user._id} className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => setShowFullImage(true)}>
              <img src={user.image || dp} alt="dp" className='h-[100%] object-cover' />  
            </div> 
           {onlineUser?.includes(user._id) &&
             <span className='w-[12px] h-[12px] rounded-full absolute  shadow-gray-500 shadow-md bottom-1 right-0.5 bg-[#29ff0d]'></span>
           }
            </div>
            
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
          </div>
            ))}
        </div>}
       

        <div className='w-full flex justify-between items-center'>
          <h1 className='font-bold text-gray-700 text-[25px] ml-2'>Hey, {userData.name || "User"}!</h1>
          <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => navigate("/profile")}>
            <img src={userData.image || dp} alt="dp" className='h-[100%] object-cover' />
          </div>
        </div>

        <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'>
          {!search && <div className='w-[45px] h-[45px] rounded-full ml-2 bg-white overflow-hidden  shadow-gray-500 shadow-md flex justify-center items-center cursor-pointer mt-1' onClick={() => setSearch(true)}>
            <CiSearch className='w-[25px] h-[25px]' />
          </div>}

          {search &&
            <form className='w-[98%] h-[45px] bg-white shadow-gray-500 shadow-md flex items-center gap-2  ml-1 overflow-hidden justify-center rounded-full'>
              <CiSearch className='w-[25px] h-[25px] ml-2' />
              <input type="text" placeholder='search user...' className='w-full h-full p-[10px] outline-none text-[17px] outline-0 border-0'
              onChange={(e)=>setinput(e.target.value)} value={input} />
              <RxCross2 className='w-[25px] h-[25px] mr-2 cursor-pointer' onClick={() => setSearch(false)} />
              
            </form>}

       
          {!search && otherUserData?.map((user) => (
            onlineUser?.includes(user._id) && 
             <div className='relative rounded-full shadow-gray-500 bg-white shadow-md'>
            <div key={user._id} className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => setShowFullImage(true)}>
              <img src={user.image || dp} alt="dp" className='h-[100%] object-cover' />  
            </div> 
             <span className='w-[12px] h-[12px] rounded-full absolute  shadow-gray-500 shadow-md bottom-0 right-0 bg-[#3aff20]'></span>

            </div>
          ))}

        </div>
      </div>

      <div className='w-full h-[60vh] overflow-auto flex gap-4 flex-col pt-4 items-center'>


        {otherUserData.map((user) => (
          <div key={user._id} className='w-[95%] h-[60px] flex justify-start items-center gap-4 bg-white shadow-lg shadow-gray-500 rounded-full cursor-pointer hover:bg-[#fbff7f]' onClick={()=>dispatch(setSelectedUser(user))}>
            <div className='relative rounded-full shadow-gray-500 bg-white shadow-md'>
            <div key={user._id} className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => setShowFullImage(true)}>
              <img src={user.image || dp} alt="dp" className='h-[100%] object-cover' />  
            </div> 
           {onlineUser?.includes(user._id) &&
             <span className='w-[12px] h-[12px] rounded-full absolute  shadow-gray-500 shadow-md bottom-1 right-0.5 bg-[#29ff0d]'></span>
           }
            </div>
            
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SideBar



