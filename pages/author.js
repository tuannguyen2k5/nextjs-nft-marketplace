import React,{useContext, useEffect, useState} from 'react'
import { AuthorProfile } from '@/components/Author'
import { Banner, Brand, Container, NFTCard, Title } from '@/components/componentsindex'
import images from "../img";
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext';
const author = () => {
  const { walletAddress,fetchMyNFTOrListedNFT } = useContext(NFTMarketplaceContext);
  const [nfts,setNfts] = useState([])
  const [myNfts, setMyNfts] = useState([])
  useEffect(() =>{
    fetchMyNFTOrListedNFT("fetchItemsListed").then((items)=>{
      setNfts(items)
    })
  },[])
  useEffect(() =>{
    fetchMyNFTOrListedNFT("fetchMyNfts").then((items)=>{
      setMyNfts(items)
    })
  },[])
  return (
    <div>
        <Container>
            <Banner bannerImage={images.creatorbackground2}/>
            <AuthorProfile currentAccount={walletAddress}/>
            <Title heading="My Nfts" paragraph="All nfts you has purchased"/>
            <NFTCard NFTData = {myNfts}/>
            <Title heading="Listed Nfts" paragraph="All nfts you has listed"/>
            <NFTCard NFTData = {nfts}/>
            <Brand/>
        </Container>
    </div>
  )
}

export default author