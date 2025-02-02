import React, {useState,useEffect} from 'react';
import axios from "axios";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'

const ImgSlider = () => {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;
    const noOfSlide = 10;

    useEffect(()=>{
        const fetchImages = async () =>{
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/images?_page=${page}&_limit=${limit}`)
                if(res){
                setImages(res.data);
                setLoading(false);
            }
            } catch (error) {
                console.log("Error fetching images:", error)
                setLoading(false);
            }
        };
        fetchImages();
    },[page]);

    if(loading){
        return <div>Loading data, please wait!</div>
    }

    function handlePrev(){
        setPage(page === 0 ? images.length - 1 : page - 1 )
    }
    function handleNext(){
        setPage(page === images.length - 1 ? 0 : page + 1 )
    }

  return (
   <div>
    <h2>Image Slider</h2>
      <div style={{ display: "flex", overflow: "hidden" }}>
        {images.map((img,index) => (
          <img key={img.id} src={img.url} alt={`Slide ${img.id}`}  style={{
            width: "200px",
            display: page === index + 1 ? "block" : "none" // Adjust index
          }} />
        ))}
      </div>
      <BsArrowLeftCircleFill size={40} style={{cursor:"pointer", marginLeft:"10px"}}
       onClick={handlePrev}/>
      <BsArrowRightCircleFill size={40} style={{cursor:"pointer", marginLeft:"10px"}}
       onClick={handleNext}/>
      <div>
        {[...Array(noOfSlide)].map((_,index)=>(
            <span
            key={index}
            style={{
                height:"12px",
                width:"12px",
                margin:"5px",
                backgroundColor:page === index +1? "black" : "gray",
                borderRadius:"50%",
                display:"inline-block",
                cursor:"pointer"

            }}
            onClick={() => setPage(index + 1)}
            ></span>
        ))}
      </div>
   </div>
  )
}

export default ImgSlider