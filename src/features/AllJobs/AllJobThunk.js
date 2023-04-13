import customFetch from "../../utils/axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobThunk = async (_,thunkAPI)=>{
  const {page, search, searchStatus, searchType, sort} = thunkAPI.getState().allJobs
 let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
 if(search){
  url = url + `&search = ${search}`
 }
  try {
    const resp = await customFetch.get(url ,{
      headers : {
        Authorization : `Bearer ${thunkAPI.getState().user.user.token}`}
    })
    return resp.data
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    
  }
}
export const showStatsThunk =  async (_,thunkAPI)=>{
  try {
    const resp = await customFetch.get("jobs/stats" ,{
      headers : {
        Authorization : `Bearer ${thunkAPI.getState().user.user.token}`}
    })
    console.log(resp.data)
    return resp.data
  } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI)
  }
}