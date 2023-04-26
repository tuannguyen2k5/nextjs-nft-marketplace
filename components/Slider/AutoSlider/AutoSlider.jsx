import CustomButton from "@/components/CustomButton/CustomButton";
import React from "react";

import './AutoSlider.module.css'
const delay = 2500;

function AutoSlider({images}) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  const handlePrevClick = () => {
    const nextIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(nextIndex);
  };

  const handleNextClick = () => {
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
  };

  return (
    <div className="relative m-w-xs overflow-hidden">

      
      <div
        className="whitespace-nowrap transition-all duration-500"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div className="inline-block h-96 w-full" key={index}>
            <img className="object-cover h-full w-full" src={image} alt="" />
          </div>
        ))}
      </div>

        <div 
        className="w-full absolute left-0 flex justify-between gap-4 px-2"
        style={{top: "50%"}}>
        <CustomButton
          handleClick={handlePrevClick}
          title="<"
          restStyles={"bg-white text-black"}
        />
        <CustomButton
          handleClick={handleNextClick}
          title=">"
          restStyles={"bg-white text-black"}
        />
        </div>
        
      </div>
  );
}

export default AutoSlider;
