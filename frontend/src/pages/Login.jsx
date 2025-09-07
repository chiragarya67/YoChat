import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setuserData } from '../redux/userSlice'
import User from '../../../backend/models/userModel'

const Login = () => {
   let navigate = useNavigate() 
   const [show, setshow] = useState(0)
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")
   const [Err, setErr] = useState("")
   let dispatch = useDispatch()

   const handleLogin = async(e)=>{
     e.preventDefault()
       try {
          let result = await axios.post(`${serverUrl}/api/auth/login`, {
             email, password
          }, {withCredentials:true})

          dispatch(setuserData(result.data))
          setErr("")
          setemail("")
          setpassword("")
          

       } catch (error) {
         console.log(error);
         setErr(error.response.data.message);
       }
   }  

  return (
        <div className='w-full h-[100vh] bg-slate-300 flex justify-center items-center'>

      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-300 shadow-lg flex flex-col gap-[30px]">

        <div className='w-full h-[200px] bg-[#FFE500] rounded-b-[30%] shadow-gray-200 shadow-md flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'>Yo-chat!</span></h1>
        </div>

        <form className='w-full flex justify-center items-center gap-4 flex-col mt-1' onSubmit={handleLogin}>
          <input type="email" placeholder='email' className='w-[90%] h-[55px] outline-none border-2 border-[#FFE500] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setemail(e.target.value)} value={email} autoComplete='username'/>
        
         <div className='w-[90%] h-[55px]  border-2 border-[#FFE500] rounded-lg shadow-gray-200 shadow-lg overflow-hidden relative'>
          <input type={`${show?"text":"password"}`} placeholder='Password' className='w-full h-full outline-none px-[20px] py-[10px] bg-white  text-gray-700 text-[19px]' onChange={(e)=>setpassword(e.target.value)} value={password} autoComplete="current-password"/>
          <span className='absolute top-[12px] right-[18px] text-[#FFE500] text-[18px] cursor-pointer' onClick={()=>setshow(prev=>!prev) }>{`${show?"hide":"show"}`}</span>
           </div>
{Err && <p className='text-red-600'>{Err}</p>}

            
           <button className='bg-[#FFE500] px-[20px] py-[10px] rounded-2xl shadow-gray-200 shadow-lg mt-10 w-[200px]'>Login</button>
           <p className='mt-12 text'> Don't have Account ? <span className='text-[#ffe600] text-[bold] cursor-pointer hover:underline' onClick={()=>navigate("/signup")}>SignUp</span> </p>
        </form>
          
       </div>
    </div>
  )
}

export default Login
