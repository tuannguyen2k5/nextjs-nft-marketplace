import React from "react";


const Title = ({ heading, paragraph }) => {
  return (
    <div className="text-center">
        <h2>{heading}</h2>
        <p>{paragraph}</p>
    </div>
  );
};

export default Title;