import axios from "axios"
import { useEffect, useState } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUserData } from "../redux/userSlice"


const getMessages = () => {
  const dispatch = useDispatch()
  let {selectedUser} = useSelector(state=>state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/message/get/${selectedUser._id}`, { withCredentials: true })
        dispatch(setOtherUserData(result.data))
      } catch (error) {
        console.log("Error fetching other users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [dispatch])

  return { loading }
}


export default getMessages
