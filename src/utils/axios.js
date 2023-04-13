import axios from  "axios"
import { ClearStore } from "../features/userSlice"

const customFetch = axios.create({
    baseURL : "https://jobify-prod.herokuapp.com/api/v1/toolkit",
})

export const checkForUnauthorizedResponse = (error ,thunkAPI)=>{
    if(error.response.status === 401){
    thunkAPI.dispatch(ClearStore())
     return thunkAPI.rejectWithValue(`unauthorized! logging out...`)

}
}
export default customFetch;