import React, { useState, useContext } from 'react'

import Image from "next/image";
import Link from "next/link";


import CustomButton from '../CustomButton/CustomButton';


//INTERNAL IMPORT
import images from "../../img";


const NFTCard = ({ NFTData }) => {
  return (
    <div className="grid grid-cols-3 gap-12 text-center mt-10">
      {NFTData && NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }}>

        <div className="flex flex-col items-center p-4 pb-12 rounded-2xl transition cursor-pointer bg-shadowlight_color shadow-xl hover:shadow-shadowdark hover:scale-105" key={i + 1}>
          <div className="w-80 h-80 rounded-2xl mb-2">
            <img src={el.image.replace("ipfs://", "https://ipfs.io/ipfs/")} />
            {/* <Image
              src={el.image}
              alt="NFT images"
              className="w-full h-full"
              width={600}
              height={600}
            /> */}
          </div>
          <p className='p-2'>{el.name} #{el.tokenId}</p>
          <p className='p-2'>{el.price}ETH</p>
          <CustomButton title="Buy NFT" />
        </div>
        </Link>
      ))}
    </div>
  )
}

export default NFTCard