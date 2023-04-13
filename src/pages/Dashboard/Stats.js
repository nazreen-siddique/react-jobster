import { useEffect } from 'react';
import {StatsContainer,ChartContainer,Loading} from "../../component"
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/AllJobs/AllJobsSlice';
const Stats = () => {
  const dispatch = useDispatch()
  const {isLoading , monthlyApplications} = useSelector((store)=>store.allJobs)
  useEffect(()=>{
    dispatch(showStats())
  },[])
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length > 0 && <ChartContainer/>}
    </>
  )
}

export default Stats