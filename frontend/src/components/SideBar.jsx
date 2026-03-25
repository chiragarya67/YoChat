import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../main'
import { setSelectedUser, setuserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import useOtherUser from '../customHooks/useOtherUser'

 const SideBar = () => {
  let { userData, otherUserData, selectedUser } = useSelector(state => state.user)
  const [search, setSearch] = useState(false)
  let dispatch = useDispatch();
  let navigate = useNavigate()
  const { loading } = useOtherUser()

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

  return (

    <div className={`lg:w-[30%] w-full h-full lg:block ${!selectedUser? "block" : "hidden" } bg-slate-200`}>
      <div className='w-full h-[280px] bg-[#FFE500] rounded-b-[30%] shadow-gray-400 shadow-md flex flex-col justify-center'>
        <h1 className='text-white font-bold text-[25px] ml-2'>Yo-chat!</h1>

        <div className='w-[45px] h-[45px] rounded-full ml-2 bg-[#FFE500] overflow-hidden  shadow-gray-500 shadow-md flex justify-center items-center cursor-pointer mt-1 absolute bottom-[20px] left-[10px]' onClick={handleLogout} >
          <BiLogOut className='w-[25px] h-[25px] mr-1 ' />
        </div>

        <div className='w-full flex justify-between items-center'>
          <h1 className='font-bold text-gray-700 text-[25px] ml-2'>Hey, {userData.name || "User"}!</h1>
          <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => navigate("/profile")}>
            <img src={userData.image || dp} alt="dp" className='h-[100%] object-cover' />
          </div>
        </div>

        <div className='w-full flex items-center gap-[20px]'>
          {!search && <div className='w-[45px] h-[45px] rounded-full ml-2 bg-white overflow-hidden  shadow-gray-500 shadow-md flex justify-center items-center cursor-pointer mt-1' onClick={() => setSearch(true)}>
            <CiSearch className='w-[25px] h-[25px]' />
          </div>}

          {search &&
            <form className='w-[98%] h-60px bg-white shadow-gray-500 shadow-md flex items-center gap-2 mt-[17px] ml-1 overflow-hidden justify-center rounded-full'>
              <CiSearch className='w-[25px] h-[25px] ml-2' />
              <input type="text" placeholder='search user...' className='w-full h-full p-[10px] text-[17px] outline-0 border-0' />
              <RxCross2 className='w-[25px] h-[25px] mr-2 cursor-pointer' onClick={() => setSearch(false)} />
            </form>}

       
          {!search && otherUserData.map((user) => (
            <div key={user._id} className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer' onClick={() => setShowFullImage(true)}>
              <img src={user.image || dp} alt="dp" className='h-[100%] object-cover' />
            </div>
          ))}

        </div>
      </div>

      <div className='w-full h-[60vh] overflow-auto flex gap-4 flex-col pt-4 items-center'>


        {otherUserData.map((user) => (
          <div key={user._id} className='w-[95%] h-[60px] flex justify-start items-center gap-4 bg-white shadow-lg shadow-gray-500 rounded-full cursor-pointer hover:bg-[#fbff7f]' onClick={()=>dispatch(setSelectedUser(user))}>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white items-center cursor-pointer'>
              <img src={user.image || dp} alt="dp" className='h-[100%] object-cover'/>
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>{userData.name || userData.userName}</h1>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SideBar



