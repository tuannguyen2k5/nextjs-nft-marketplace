import React,{useState} from 'react'

const Filter = ({titles}) => {
  const [activeTitle, setActiveTitle] = useState(titles[0]);

  const handleTitleClick = (title) => {
    setActiveTitle(title);
  };
  return (
    <div className=" grid grid-cols-4 gap-2 mt-10">
     <div className='flex flex-row bg-custom rounded-full w-full h-10 items-center'>
      {titles.map((title,index) => {
        const isActive = title === activeTitle;
        const bgClass = isActive ? "bg-white" : "bg-transparent";
        return (
          <div 
          className={`${bgClass} rounded-full w-full h-full mr-2 last:mr-0 p-2 text-center hover:font-bold cursor-pointer`} 
          key={index}
          onClick={() => handleTitleClick(title)}>
           {title}
          </div>
        );
      })}
    </div>
  </div>
        

   
  )
}

export default Filter;
