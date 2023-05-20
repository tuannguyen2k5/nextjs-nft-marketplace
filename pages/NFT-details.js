import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {  Category, Brand,NFTDetailsPage,Container } from "../components/componentsindex";
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";


//IMPORT SMART CONTRACT DATA

const NFTDetails = () => {
  const { walletAddress } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <Container>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
      </Container>
    </div>
  );
};

export default NFTDetails;
