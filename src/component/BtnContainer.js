import { ChangePage } from "../features/AllJobs/AllJobsSlice"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';

const BtnContainer = () => {
  const {numOfPages,page} = useSelector((store)=>store.allJobs) 
  const dispatch = useDispatch()

   const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
const nextPage = ()=>{
  let newPage = page + 1;
  if(newPage > numOfPages){
     newPage = 1
  }
  dispatch(ChangePage(newPage))
}
const prevPage = ()=>{
let newPage = page - 1;
  if(newPage < 1){
     newPage = numOfPages
  }
  dispatch(ChangePage(newPage))
}
  return (
   <Wrapper>
    <button className="prev-btn" onClick={prevPage}>
      <HiChevronDoubleLeft/>
      prev
    </button>
    <div className="btn-container">
      {pages.map((pageNumber)=>{
        return <button type="button" 
        key={pageNumber}
         onClick={() => dispatch(ChangePage(pageNumber))}
        className={ pageNumber === page ? 'pageBtn active' : 'pageBtn'
     }
     >
      {pageNumber}
     </button>
      })}
    </div>
    <button className="next-btn" onClick={nextPage}>
      next
      <HiChevronDoubleRight/>
    </button>
   </Wrapper>
  )
}

export default BtnContainer