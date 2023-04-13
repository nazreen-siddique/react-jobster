import { showLoading,hideLoading,getAllJobs} from '../AllJobs/AllJobsSlice';
import {clearValues} from "./jobSlice"
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import authHeader from '../../utils/authHeader';


export const createJobThunk = async(job , thunkAPI)=>{
try {
  const resp = await customFetch.post('/jobs' ,job,authHeader(thunkAPI) )
  thunkAPI.dispatch(clearValues())
  return resp.data
} catch (error) {
     return checkForUnauthorizedResponse(error,thunkAPI)
}
}
export const deleteJobThunk = async(id,thunkAPI)=>{
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${id}`,authHeader(thunkAPI))
     thunkAPI.dispatch(getAllJobs());
     return resp.data.msg

  } catch (error) {
    thunkAPI.dispatch(hideLoading())
      return checkForUnauthorizedResponse(error,thunkAPI)
  }
}
export const editJobThunk = async({jobId,job},thunkAPI)=>{
try {
  const resp = await customFetch.patch(`/jobs/${jobId}` ,job ,authHeader(thunkAPI) )
  thunkAPI.dispatch(clearValues())
  return resp.data
} catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI);
}
}
