import React, { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setuserData } from '../redux/userSlice';

const Profile = () => {
  let { userData } = useSelector(state => state.user)
  let navigate = useNavigate()
  let [name, setName] = useState(userData.name || "")
  let [frontendimg, setFrontendImg] = useState(userData.image || dp)
  let [backendimg, setbackendImg] = useState("")
  let image = useRef()
  let dispatch = useDispatch()
  let [saving, setSaving] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  const handleImage = (e)=>{
     let file = e.target.files[0];
     setbackendImg(file)
     setFrontendImg(URL.createObjectURL(file))
  }

  const handleProfile = async (e)=>{
    setSaving(true)
    e.preventDefault()
    try {
      
      let formData = new FormData()
      formData.append("name",name)
      
      if(backendimg){
        formData.append("image",backendimg)
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {withCredentials:true})
      setSaving(false)
      dispatch(setuserData(result.data))
      

    } catch (error) {
      console.log(error)
      setSaving(false)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>

      <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack className='h-[40px] w-[40px] text-gray-600 ' />
      </div>

      <div className=' bg-white rounded-full 
       border-4 border-[#FFE500] shadow-gray-400 shadow-lg flex relative'>
   


        <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center cursor-pointer' onClick={() => setShowFullImage(true)}>
          <img src={frontendimg} alt="dp" className='h-[100%] object-cover' />
        </div>
        

        <MdAddPhotoAlternate className='absolute bottom-5 cursor-pointer text-gray-800 right-3 w-8 h-8' onClick={()=>image.current.click()}/>

      </div>
      <form className='w-[95%] h-[380px] max-w-[500px] flex justify-center gap-[20px] items-center flex-col' onSubmit={handleProfile}>
        
        <input type='file' hidden accept='image/*' ref={image} onChange={handleImage} />

        <input type="text" className='w-[90%] h-[55px] outline-none border-2 border-[#FFE500] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} />
        <input type="text" className='w-[90%] h-[55px] outline-none border-2 border-[#FFE500] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-500 text-[19px]' value={userData.username} readOnly />
        <input type="email" className='w-[90%] h-[55px] outline-none border-2 border-[#FFE500] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-500 text-[19px]' value={userData.email} readOnly />
        <button className='bg-[#FFE500] px-[20px] py-[10px] rounded-2xl shadow-gray-200 shadow-lg mt-8 w-[200px]' disabled={saving}> {saving?"Saving...":"Save profile"} </button>
      </form>

       {showFullImage && (
        
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={() => setShowFullImage(false)}>
          <img src={frontendimg} alt="Full Profile" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"/>
        </div>
      )}

    </div>

  )
}

export default Profile
