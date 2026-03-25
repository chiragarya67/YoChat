import axios from "axios"
import { useEffect, useState } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUserData } from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"
import { setuserData } from "../redux/userSlice"

const getMessages = () => {
  const dispatch = useDispatch()
  let {userData,selectedUser} = useSelector(state=>state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!selectedUser?._id) {
    dispatch(setMessages([]));
    return;
  }

    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, { withCredentials: true })
        dispatch(setMessages(result.data))
      } catch (error) {
        console.log("Error fetching other users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [userData, selectedUser])

  return { loading }
}


export default getMessages
