import axios from "axios"
import { useEffect, useState } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUserData } from "../redux/userSlice"


const useOtherUser = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true })
        dispatch(setOtherUserData(result.data))
      } catch (error) {
        console.log("Error fetching other users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch])

  return { loading }
}


export default useOtherUser
