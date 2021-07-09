import React, {useState, useEffect} from 'react';
import './pagination.css'
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(()=>{
      setActiveIndex(0)
  },[totalPosts])


  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (index, number) => {
    setActiveIndex(index); 
    paginate(number)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
  
    <div className='pagination'>
      {pageNumbers.map( (number, index) => (
          <span className={activeIndex === index ? "active" : "unactive"} key={number} onClick={() =>handleOnClick(index, number)}>
              {number}
          </span>

      ))}
    </div>
  
  );
};

export default Pagination;