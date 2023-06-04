import React, { useEffect, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";


//INTERNAL IMPORT
const SearchBar = ({onHandleSearch,onClearSearch}) => {
    const [search,setSearch] = useState("")
    const [searchItem,setSearchItem] = useState(search)
    useEffect(() =>{
        const timer = setTimeout(() => setSearch(searchItem),1000)
        return () => clearTimeout(timer)
    },[searchItem])
    useEffect(() =>{
        if(search){
            console.log(search)
            onHandleSearch(search)
        } else{
            onClearSearch()
        }
    },[search])
  return (
    <div className="w-full ">
      <div className="w-2/5 flex rounded-2xl items-center mt-32 mb-12 mx-auto my-0">
        <BsSearch className="p-2 cursor-pointer text-4xl" />
        <input 
        type="text" 
        placeholder="Type your keyword..."
        onChange={(e) => setSearchItem(e.target.value)}
        value={searchItem}
         />
        <BsArrowRight className="p-2 cursor-pointer text-4xl" />
      </div>
    </div>
  );
};

export default SearchBar;