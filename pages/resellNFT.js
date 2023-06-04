import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, CustomButton } from '@/components/componentsindex'
import { NFTMarketplaceContext } from '@/context/NFTMarketplaceContext'
import axios from 'axios'

const resellNFT = () => {
    const router = useRouter()
    const {createSale} = useContext(NFTMarketplaceContext)
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")
    const {id,tokenURI} = router.query
    const fetchNFT = async () =>{
      if(!tokenURI) return
      const {data} =  await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenURI.slice(7)}`, {
        headers: {
            'Accept': 'text/plain'
        }})
      setPrice(data.price)
      setImage(data.image)
    }
    useEffect(()=>{
      fetchNFT()
    },[id])
    const resell = async () =>{
        await createSale(tokenURI,price,true,id)
        router.push("/author")
    }
   
  return (
    <div className='mb-10'>
    <Container>
        <div className='w-1/3 mx-auto my-0'>
        <label className='text-bold text-2xl'>Price</label>
        <input
            type='number'
            placeholder="Resell Price"
            className="mt-6 border rounded p-2 mb-4"
            min={0.0001}
        />
        {image && <img src={image.replace("ipfs://", "https://ipfs.io/ipfs/")} width={400} height={400} className='mb-4'/>}
        <CustomButton title="Resell NFT" handleClick={resell}/>
        </div>
    </Container>
    </div>
  )
}

export default resellNFT