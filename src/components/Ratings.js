import React from 'react';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';

const Ratings = ({rating, rateMe, style}) => {
  return (
    <>
        {[...Array(5)].map((_, i) => {
            return (
            <span key={i} onClick={() => rateMe(i + 1)} style={style}>{
                rating > i ? (
                    <AiFillStar fontSize="15px"/>
                    ) : (
                    <AiOutlineStar fontSize="15px"/>
                    )}
            </span>
            )
        })}
    </>
  )
}

export default Ratings