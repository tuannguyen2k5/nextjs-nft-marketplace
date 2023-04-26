import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    {
      images: images.creatorbackground1,
      name: "Dance Monkey",
    },
    {
      images: images.creatorbackground2,
      name: "Sports",
    },
    {
      images: images.creatorbackground3,
      name: "Entirtment Art",
    },
    {
      images: images.creatorbackground4,
      name: "Time Life",
    },
    {
      images: images.creatorbackground5,
      name: "Animals Art",
    },
    {
      images: images.creatorbackground6,
      name: "Music",
    },
    {
      images: images.creatorbackground7,
      name: "Digital Arts",
    },
    {
      images: images.creatorbackground8,
      name: "Hubby",
    },
    {
      images: images.creatorbackground8,
      name: "Bad Arts",
    },
    {
      images: images.creatorbackground9,
      name: " Arts",
    },
    {
      images: images.creatorbackground10,
      name: "My Fav",
    },
  ];
  return (
      <div className="mt-10 px-16 grid grid-cols-6 gap-8">
        {CategoryArray.map((el, i) => (
          <div className="transition rounded-2xl overflow-hidden cursor-pointer" key={i + 1}>
            <div className="w-80 h-32">
            <Image
              src={el.images}
              className="w-full h-full"
              alt="Background image"
            />
            </div>

            <div className="flex p-4 gap-4">
              <span className="text-5xl">
                <BsCircleFill />
              </span>
              <div>
                <h4 >{el.name}</h4>
                <small>{i + 1}995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default Category;