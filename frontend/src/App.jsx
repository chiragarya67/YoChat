import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import useOtherUser from './customHooks/useOtherUser'
import { use, useEffect } from 'react'
import { serverUrl } from './main'
import {io} from "socket.io-client"
import { setonlieUser, setSocket } from './redux/userSlice'

function App() {
  let {userData, socket, onlineUser} = useSelector(state=>state.user)
  const { loading } = getCurrentUser()
  useOtherUser()
  let dispatch = useDispatch()
   
  useEffect(() => {
    if(userData) {
   const socketio = io(`${serverUrl}`,{
     query:{
       userId:userData?._id
      }
    })

    dispatch(setSocket(socketio))

    socketio.on("getOnlineUsers",(users)=>{
      dispatch(setonlieUser(users))
    })

   return ()=>socketio.close()

  } else {
    if(socket){
      socket.close()
      dispatch(setSocket(null))
    }
  }

  }, [userData])
    
  
  

  return (
    <>
     <Routes>
      <Route path='/login' element={!userData?<Login/> : <Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/> : <Navigate to="/profile"/>}/>
      <Route path='/profile' element={userData? <Profile/> :<Navigate to="/login"/>}/>
      <Route path='/' element={userData? <Home/> : <Navigate to="/login"/>}/>
     </Routes>

    </>
  )
}

export default App
