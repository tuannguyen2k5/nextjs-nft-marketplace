import React, { useState } from "react";
import Image from "next/image";
import {
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

import images from "../../../img"
import CustomButton from "@/components/CustomButton/CustomButton";
const AuthorProfile = ({ currentAccount }) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

  return (
    <div className="mt-20">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <Image
            src={images.nft_image_1}
            className="rounded-2xl"
            alt="NFT IMAGES"    
            width={220}
            height={220}
          />
        </div>

        <div className="col-span-4">
          <h2>
            Dony Herrera
          </h2>
         

          <div className="-mt-4 flex">
            <input className="border-none cursor-none w-1/3 bg-transparent" type="text" defaultValue={currentAccount} id="myInput" />
            <FiCopy
              onClick={() => copyAddress()}
              className="transition cursor-pointer hover:text-black hover:shadow"
            />
          </div>

          <p>
            Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
            Contributing to @ether_cards, an NFT Monetization Platform.
          </p>

          <div className="flex items-center gap-4 text-lg">
            <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
              <TiSocialFacebook />
            </a>
            <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
              <TiSocialInstagram />
            </a>
            <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
              <TiSocialLinkedin />
            </a>
            <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
              <TiSocialYoutube />
            </a>
          </div>
        </div>

        <div className="col-span-1 flex items-start gap-8 relative">
          <CustomButton title="Follow" handleClick={() => {}} />
          <BsThreeDots
            onClick={() => openReport()}
            className="cursor-pointer text-xl"
          />

          {report && (
            <p className="absolute p-2 w-40 shadow-md rounded-2xl left-20 top-4">
              Report abouse
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;