import React from 'react';


const CustomButton = ({ title, handleClick, restStyles }) => (
  <button
    type="button"
    className={`px-4 py-2 rounded-lg bg-black w-fit text-white font-bold hover:opacity-80 ${restStyles}`}
    onClick={handleClick}
  >
    {title}
  </button>
);

export default CustomButton;