import React,{useState} from 'react'
import { FaStar } from "react-icons/fa";


const StarRating = ({noOfStar=5}) => {
    const[rating, setRating] = useState(0);
    const[hover, setHover] = useState(0);

    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex);
    }
    function handleMouseMove(getCurrentIndex){
        setHover(getCurrentIndex);
    }
    function handleMouseLeave(getCurrentIndex){
        setHover(rating);
    }

  return (
   <div className='w-full h-screen bg-purple-200 flex justify-center items-center'>
    <div className='flex justify-center items-center text-5xl'>
        {
            [...Array(noOfStar)].map((_,index)=>{
                index += 1

                return <FaStar
                key={index}
                className={`${index <= (hover || rating) ? 'text-yellow-500' : ''}`}
                onClick={()=>handleClick(index)}
                onMouseMove={()=>handleMouseMove(index)}
                onMouseLeave={()=>handleMouseLeave(index)}
                />
            })
        }
    </div>
   </div>
  )
}

export default StarRating