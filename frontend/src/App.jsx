import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import loadingVideo from './assets/loading.mp4'

function App() {
  let {userData} = useSelector(state=>state.user)
  const { loading } = getCurrentUser()


  if (loading){
      <video
        src={loadingVideo}
        autoPlay
        loop
        muted
        className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg"
      />
  } 

  return (
    <>
     <Routes>
      <Route path='/login' element={!userData?<Login/> : <Navigate to="/profile"/>}/>
      <Route path='/signup' element={!userData?<SignUp/> : <Navigate to="/profile"/>}/>
      <Route path='/profile' element={userData? <Profile/>:<Navigate to="/login"/>}/>
      <Route path='/' element={userData? <Home/>:<Navigate to="/login"/>}/>
     </Routes>

    </>
  )
}

export default App
