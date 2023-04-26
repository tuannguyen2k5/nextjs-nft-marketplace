import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { useRouter } from "next/router";


import images from "../../img";
import CustomButton from "../CustomButton/CustomButton";

const Brand = () => {
  const router = useRouter();
  return (
    <div className="my-40">
      <div className="grid grid-cols-7 gap-20 items-center">
        <div className="col-span-3">
          <a href="/">
            <DiJqueryLogo className="text-4xl" />
          </a>
          <h1>Earn free crypto with Ciscrypt</h1>
          <p>A creative agency that lead and inspire.</p>

          <div className="flex items-center gap-8 mt-12">
            <CustomButton
              title="Create"
              handleClick={() => router.push("/uploadNFT")}
            />
            <CustomButton
              title="Discover"
              handleClick={() => router.push("/searchPage")}
            />
          </div>
        </div>
        <div className="col-span-4">
          <Image src={images.earn} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;