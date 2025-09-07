import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setuserData, setloading } from "../redux/userSlice"


const getCurrentUser = () => {
  let dispatch = useDispatch()
  const loading = useSelector(state => state.user.loading)

     useEffect(()=>{
        const fetchUser = async ()=>{
         try {
            dispatch(setloading(true))
            let result = await axios.get(`${serverUrl}/api/user/current`, {withCredentials: true})
            dispatch(setuserData(result.data))
         } catch (error) {
              console.log(error);  
         } finally {
          dispatch(setloading(false))
         }
        }
       fetchUser()
     },[dispatch])
     return { loading }
}

export default getCurrentUser
