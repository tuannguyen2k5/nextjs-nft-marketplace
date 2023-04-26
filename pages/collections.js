import { Collection, Container,Banner,Filter,Brand } from '@/components/componentsindex'
import images from "../img";
import React from 'react'

const collections = () => {
  const titles = ["1H", "1D", "7D", "30D"]
  const collectionArray = [
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
    {
      image: images.nft_image_3,
    },
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
    {
      image: images.nft_image_3,
    },
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
  ];
  return (
    <div>
       <Banner bannerImage={images.creatorbackground1} />
      <Container>
        <Filter titles={titles}/>
        <Collection/>
        <Brand/>
      </Container>
    </div>
  )
}

export default collections