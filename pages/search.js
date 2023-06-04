import { Banner,Brand,Container,NFTCard,SearchBar } from '@/components/componentsindex'
import React, { useContext, useEffect, useState } from 'react'
import images from "../img";
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext';

const search = () => {
  const {fetchNFTs} = useContext(NFTMarketplaceContext)
  const [nfts,setNfts] = useState([])
  const [nftsCopy,setNftsCopy] = useState([])

  useEffect(() =>{
    fetchNFTs().then((items) =>{
      setNfts(items)
      setNftsCopy(items)
    })
  },[])
  const onHandleSearch =(value) =>{
    console.log(nfts)
    const filteredNFTS = nfts.filter(({name}) =>
        name.toLowerCase().includes(value.toLowerCase())
    )
    console.log(filteredNFTS)
    if(filteredNFTS.length ===0){
        setNfts(nftsCopy)
    }
    else{
        setNfts(filteredNFTS)
    }
  
  }
  const onClearSearch = () =>{
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy)
    }
  }
  return (
    
    <div>
      <Container>
      <Banner bannerImage={images.creatorbackground1}/>
      <SearchBar
      onHandleSearch={onHandleSearch}
      onClearSearch={onClearSearch}/>
      <NFTCard NFTData={nfts}/>
      <Brand/>
      </Container>
    </div>
   
  )
}

export default search