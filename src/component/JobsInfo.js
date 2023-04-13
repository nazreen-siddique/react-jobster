import Wrapper from '../assets/wrappers/JobInfo';

import React from 'react'

const JobsInfo = ({icon , text}) => {
  return (
 <Wrapper>
    <span className="icon">{icon}</span>
    <span className="text">{text}</span>
 </Wrapper>
    )
}

export default JobsInfo