import React, { useState, useEffect, useContext } from "react";
import { Slider, Filter, Table, Container, Category, NFTCard, Collection, Brand, Title } from "@/components/componentsindex"
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";
const titles = ["1H", "1D", "7D", "30D"]
const data = [
  {
    id: 1,
    collection: 'CryptoPunks',
    floorPrice: '10.5 ETH',
    volume: '123',
    volumeChange: '+5%',
    items: '10',
    owners: '5',
  },
  {
    id: 2,
    collection: 'Bored Ape Yacht Club',
    floorPrice: '8.2 ETH',
    volume: '87',
    volumeChange: '-3%',
    items: '5',
    owners: '3',
  },
  {
    id: 3,
    collection: 'Pudgy Penguins',
    floorPrice: '2.1 ETH',
    volume: '234',
    volumeChange: '+10%',
    items: '15',
    owners: '7',
  },
  {
    id: 4,
    collection: 'Meebits',
    floorPrice: '5.8 ETH',
    volume: '76',
    volumeChange: '+2%',
    items: '7',
    owners: '4',
  },
];

const Home = () => {
 
  const { walletAddress,fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);

  // useEffect( () => {
  //   if (walletAddress) {
  //     console.log('fetching nft...')
  //     fetchNFTs().then((items) => {
  //       setNfts(items.reverse());
  //       console.log(nfts);
  //     });
  //     console.log('okk')
  //   }
  // },[]);
  useEffect(() =>{
    if (walletAddress) {
    (async () => {
      const nfts = await fetchNFTs()

      setNfts(nfts)
    })()
  }
  })

  return (
    <div>
      
      <Container>
        <Slider />
        <Filter titles={titles}/>
        <Collection/>
        <Table data={data} />
        <Title heading="Category" paragraph="Explore the NFTs in the most featured categories."/>
        <Category/>
        <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <NFTCard NFTData={nfts}/>
        <Brand/>
      </Container>
    </div>
  )
}

export default Home
