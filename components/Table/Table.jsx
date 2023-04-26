import React from 'react';
import './Table.module.css';

const Table = ({ data }) => {
  return (
    <div className="w-full mt-10">
      <div className="flex w-full border font-bold ">
        <div className="flex-1 items-center p-2">#</div>
        <div className="flex-1 items-center p-2">Collection</div>
        <div className="flex-1 items-center p-2">Floor Price</div>
        <div className="flex-1 items-center p-2">Volume</div>
        <div className="flex-1 items-center p-2">Volume Change</div>
        <div className="flex-1 items-center p-2">Items</div>
        <div className="flex-1 items-center p-2">Owners</div>
      </div>
      {data.map((item, index) => (
        <div className="flex w-full border font-bold" key={index}>
          <div className="flex-1 items-center p-2">{item.id}</div>
          <div className="flex-1 items-center p-2">{item.collection}</div>
          <div className="flex-1 items-center p-2">{item.floorPrice}</div>
          <div className="flex-1 items-center p-2">{item.volume}</div>
          <div className="flex-1 items-center p-2">{item.volumeChange}</div>
          <div className="flex-1 items-center p-2">{item.items}</div>
          <div className="flex-1 items-center p-2">{item.owners}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;
