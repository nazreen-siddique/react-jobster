import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";
import { getUserFromLocalStorage,addUserToLocalStorage,removeUserFromLocalStorage } from "../utils/localStorage";
import { clearAllJobValues } from "./AllJobs/AllJobsSlice";
import { clearValues } from "./job/jobSlice";

const initialState ={
isLoading : false,
isSidebarOpen : false,
user :getUserFromLocalStorage()
}
// for register user
export const registerUser = createAsyncThunk("user/registerUser" , async(user,thunkAPI)=>{
   try {
    const resp = await customFetch.post("/auth/register" ,user)
   return resp.data 
  } catch (error) {
     return thunkAPI.rejectWithValue(error.response.data.msg)
   }
})
// for login user

export const loginUser = createAsyncThunk("user/loginUser" , async(user,thunkAPI)=>{
    try {
    const resp = await customFetch.post("/auth/login" ,user)
   return resp.data 
  } catch (error) {
     return thunkAPI.rejectWithValue(error.response.data.msg)
   }
})
// for changes in profile page
export const updateUser = createAsyncThunk("user/updateUser" , async(user,thunkAPI)=>{
   try {
    const resp = await customFetch.patch("/auth/updateUser",user ,{
      headers : {
         authorization :`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
   return resp.data 
  } catch (error) {
   if(error.response.status === 401){
    thunkAPI.dispatch(logoutUser())
     return thunkAPI.rejectWithValue(`unauthorized! logging out...`)

   }
     return checkForUnauthorizedResponse(error,thunkAPI)
   }
})

export const ClearStore = createAsyncThunk('user/clearStore' , async(msg,thunkAPI)=>{
   try {
      thunkAPI.dispatch(logoutUser(msg))
      thunkAPI.dispatch(clearAllJobValues())
      thunkAPI.dispatch(clearValues())
      return Promise.resolve()
   } catch (error) {
      return Promise.reject()
   }
})

const userSlice = createSlice({
name : 'user' ,
initialState,
reducers : {
   toggleSidebar :(state)=>{
      state.isSidebarOpen = !state.isSidebarOpen
   },
   logoutUser :(state,{payload})=>{
     state.user = null;
     state.isSidebarOpen = false;
     removeUserFromLocalStorage()
     toast.success(payload)
   }
},
extraReducers :(builder)=> {
  builder.addCase(registerUser.pending,(state)=>{
     state.isLoading = true
  })
  .addCase(registerUser.fulfilled,(state,{payload}) => {
     const{ user} = payload;
   state.isLoading = false;
   state.user = user;
   addUserToLocalStorage(user)
   toast.success(`hello there ${user.name}`)
  })
  .addCase(registerUser.rejected ,(state,{payload})=>{ state.isLoading = false;
    toast.error(payload)})
  .addCase(loginUser.pending,(state)=>{
     state.isLoading = true
  })
  .addCase(loginUser.fulfilled,(state,{payload}) => {
     const{ user} = payload;
   state.isLoading = false;
   state.user = user;
   addUserToLocalStorage(user)
   toast.success(`Welcome back ${user.name}`)
  })
  .addCase(loginUser.rejected ,(state,{payload})=>{ state.isLoading = false;
    toast.error(payload)})
  .addCase(updateUser.pending,(state)=>{
     state.isLoading = true
  })
  .addCase(updateUser.fulfilled,(state,{payload}) => {
     const{ user} = payload;
   state.isLoading = false;
   state.user = user;
   addUserToLocalStorage(user)
   toast.success(`user updated`)
  })
  .addCase(updateUser.rejected ,(state,{payload})=>{ state.isLoading = false;
    toast.error(payload)})
  .addCase(ClearStore.rejected ,()=>{ 
    toast.error("there was an error...")})
  
}
})
export const {toggleSidebar,logoutUser } =userSlice.actions;
export default userSlice.reducer
