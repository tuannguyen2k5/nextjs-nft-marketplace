import React from 'react'
import AutoSlider from './AutoSlider/AutoSlider'
import CustomButton from '../CustomButton/CustomButton'
const Slider = () => {
    const images = [
      "https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=5",
      "https://picsum.photos/800/600?random=10"
      ];
      
      
  return (
      <div className='grid grid-cols-3 mx-auto my-0 bg-custom'>
         <div className='col-span-2 flex flex-col justify-center items-start pl-5'>
         <h1>NFT marketplace for your community</h1>
         <p className='my-3'>All your collections under one roof.</p>
         <CustomButton title="Explore"/>
         </div>
         <div className='col-span-1'>
         <AutoSlider images={images}/>
         </div>
        
    </div>
    
  )
}

export default Slider