import React from "react";
import Image from "next/image";


const Banner = ({ bannerImage }) => {
  return (
    <div >
      <div className="h-96 object-cover">
        <Image
          src={bannerImage}
          alt="background"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Banner;