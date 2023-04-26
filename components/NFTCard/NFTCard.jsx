import React,{useState} from 'react'

import Image from "next/image";

import CustomButton from '../CustomButton/CustomButton';

//INTERNAL IMPORT
import images from "../../img";
const NFTCard = ({NFTData}) => {
    const CardArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className="grid grid-cols-3 gap-12 text-center">
      {CardArray.map((el, i) => (
          <div className="flex flex-col items-center p-4 pb-12 rounded-2xl transition cursor-pointer bg-shadowlight_color shadow-xl hover:shadow-shadowdark hover:scale-105" key={i + 1}>
            <div className="w-80 h-80 rounded-2xl mb-2">
              <Image
                src={el}
                alt="NFT images"
                className="w-full h-full"
              />
            </div>
            <p className='p-2'>NFT Name</p>
            <p className='p-2'>0.01ETH</p>
            <CustomButton title="Buy NFT"/>
          </div>
      ))}
    </div>
  )
}

export default NFTCard