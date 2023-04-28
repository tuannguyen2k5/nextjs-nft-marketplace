import React from 'react'
import { AuthorProfile } from '@/components/Author'
import { Banner, Brand, Container } from '@/components/componentsindex'
import images from "../img";
const author = () => {
  return (
    <div>
        <Container>
            <Banner bannerImage={images.creatorbackground2}/>
            <AuthorProfile currentAccount="0xc906bc7B0bbae9b285DccF7498a1fc0B2C9758Fe"/>
            <Brand/>
        </Container>
    </div>
  )
}

export default author