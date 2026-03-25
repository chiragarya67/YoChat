 import { createSlice } from "@reduxjs/toolkit";

 const userSlice = createSlice({
    name : "user",
    initialState:{
        userData: null,
        loading : true,
        otherUserData: [],
        selectedUser: null
    },
    reducers:{
        setuserData: (state, action)=>{
         state.userData = action.payload
        },
        setloading: (state, action)=>{
         state.loading = action.payload
        },
        setOtherUserData: (state, action)=>{
            state.otherUserData = action.payload
        },
        setSelectedUser: (state, action)=>{
            state.selectedUser = action.payload
        }

    }
 })

 export const { setuserData, setloading, setOtherUserData, setSelectedUser} = userSlice.actions
 export default userSlice.reducer