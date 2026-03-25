import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import useOtherUser from './customHooks/useOtherUser'

function App() {
  let {userData} = useSelector(state=>state.user)
  const { loading } = getCurrentUser()
  useOtherUser()


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
