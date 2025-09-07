 import { createSlice } from "@reduxjs/toolkit";

 const userSlice = createSlice({
    name : "user",
    initialState:{
        userData: null,
        loading : true,
    },
    reducers:{
        setuserData: (state, action)=>{
         state.userData = action.payload
        },
        setloading: (state, action)=>{
         state.loading = action.payload
        }

    }
 })

 export const { setuserData, setloading } = userSlice.actions
 export default userSlice.reducer