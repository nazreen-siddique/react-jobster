import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobsInfo from './JobsInfo';
import {setEditJob, deleteJob } from '../features/job/jobSlice';

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) =>{
  const dispatch = useDispatch();
  const date = moment(createdAt).format('MMM Do, YYYY')

   return (<Wrapper>
    <header>
      <div className="main-icon">
        {company.charAt(0)}
      </div>
      <div className="info">
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
    </header>
     <div className="content">
      <div className="content-center">
         <JobsInfo icon = {<FaLocationArrow/> } text={jobLocation} />
         <JobsInfo icon = {<FaCalendarAlt/> } text={date} />
         <JobsInfo icon = {<FaBriefcase/> } text={jobType} />
         
        <div className={ `status ${status}`}>{status}</div>
      </div>
     </div>
     <footer>
      <div className="actions">
        <Link to="/add-job" className='btn edit-btn'
              onClick={() => {
                dispatch(setEditJob({editJobId: _id,
           position,company,jobLocation,
jobType,status,}));
              }}
            >Edit</Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={
                ()=>{dispatch(deleteJob(_id))}
              }
            >
              Delete
            </button>
      </div>
     </footer>
   </Wrapper>)
}

export default Job