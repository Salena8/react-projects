import React,{useEffect, useState} from 'react'

const ColourGenerator = () => {

    const[typeOfColor, setTypeOfColor] = useState('hex');
    const[color, setColor] = useState('#ffffff')
  
    function colorHex(){
     const hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
      let hexColor = '#';
      for(let i=0;i<6;i++){
        hexColor += hex[Math.floor(Math.random()*hex.length)];
      }
      setColor(hexColor)
    }

    function colorRgb() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        console.log(rgbColor);
        setColor(rgbColor);
      }

    useEffect(()=>{
        if(typeOfColor === "hex") colorHex();
        else colorRgb();
    },[typeOfColor])
  
    return (
      <div style={{backgroundColor:color,height:"100vh",width:"100vw"}} >
        <div className=''>
          <button onClick={()=>setTypeOfColor("hex")}>Generate HEX</button>
          <button onClick={()=>setTypeOfColor("rgb")}>Generate RGB</button>
          <button onClick={typeOfColor === "hex"?
           colorHex:
          colorRgb}>Generate random colour</button>
         <div>
            <h2>{typeOfColor === "hex"? "HEX value" : "RGB value"}</h2>
            <h3>{color}</h3>
         </div>
        </div>
      </div>
    )
}

export default ColourGenerator