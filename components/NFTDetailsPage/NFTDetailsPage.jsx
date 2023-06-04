import React,{useContext} from 'react'
import {
  MdVerified,
} from "react-icons/md";
import { CustomButton } from '../componentsindex';
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";
import {useRouter} from 'next/router';


const NFTDetailsPage = ({nft}) => {
  const { walletAddress,buyNFT } = useContext(NFTMarketplaceContext);
  const router = useRouter()
  return (
    <div className="grid gap-20 grid-cols-2">
      <div>
      <img src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}  width={500} height={500}/>
      </div>
      <div>
      <h1>{nft.name} #{nft.tokenId}</h1>
          <div className="flex items-center gap-8 pb-2">
            <div className="flex items-center gap-4">
             
              <div>
                <small>Seller</small> <br />
                <span className='text-bold'>
                  {nft.seller} <MdVerified />
                </span>
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <h3 className='text-2xl'>Description</h3>
            <p>{nft.description}</p>
          </div>
          <div className='mb-5'>
              <div
                className="border-2 rounded-lg p-4 border-green-500"
              >
                <small>Current Bid</small>
                <p className="text-bold">
                 {nft.price} ETH 
                </p>
              </div>
            </div>
            <div>
              {walletAddress == nft.seller.toLowerCase() ?(
                <p>you can not buy your own nft</p>
              ) : walletAddress == nft.owner.toLowerCase() ?(
                <CustomButton title="List on marketplace" handleClick={() =>router.push(`/resellNFT?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}/>
              ):(
                <CustomButton title="Buy" handleClick={() =>{buyNFT(nft)}}/>
              )}
            </div>
      </div>

          

          
    </div>
    )
}

export default NFTDetailsPage