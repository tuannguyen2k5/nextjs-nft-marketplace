import React from "react";


const Title = ({ heading, paragraph }) => {
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto my-0">
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default Title;