 import { createSlice } from "@reduxjs/toolkit";

 const userSlice = createSlice({
    name : "user",
    initialState:{
        userData: null,
        loading : true,
        otherUserData: [],
        selectedUser: null,
        socket : null,
        onlineUser: null,
        searchData: null
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
        },
        setSocket: (state, action)=>{
            state.socket = action.payload
        },
        setonlieUser: (state, action)=>{
            state.onlineUser = action.payload
        },
        setsearchData: (state, action)=>{
            state.searchData = action.payload
        }

    }
 })

 export const { setsearchData, setSocket, setonlieUser, setuserData, setloading, setOtherUserData, setSelectedUser} = userSlice.actions
 export default userSlice.reducer