import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { useRouter } from "next/router";
import { ethers } from 'ethers';
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';
const pinataApiKey = process.env.pinataApiKey
const pinataApiSecret = process.env.pinataApiSecret


export const NFTMarketplaceContext = createContext()
export const NFTMarketplaceProvider = (({children}) =>{
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [walletAddress, setWalletAddress] = useState('')
    const [contract, setContract] = useState(null)
    const [provider, setProvider] = useState(null);
    const [connected,setConnected] = useState(false)
    const router = useRouter();

    const connectingWithSmartContract = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // // Prompt user for account connections
            // await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());
            const contractMarketplace = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signer);
            console.log(contractMarketplace)
            setProvider(provider);
            setContract(contractMarketplace);
        } catch (error) {
            console.log("Something went wrong when connecting with smart contract")
        }
    }
    useEffect(() => {
       if(connected){
        connectingWithSmartContract()
       }     
    }, [walletAddress]);

    //Update wallet address
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        if (accounts) setWalletAddress(accounts[0]);
    }
    useEffect(() => {
        window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
    }, []);

    const connectWallet = async () => {
        try {
          if (!window.ethereum)
            return setOpenError(true), setError("Install MetaMask");
    
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          setConnected(true)
        } catch (error) {
          setError("Error while connecting to wallet");
          setOpenError(true);
        }
      };
    const createNFT = async (name, price, description, image) => {
        if (!name || !description || !price || !image)
            return setError("Data Is Missing"), setOpenError(true);
        try {
            const url = await storeImages(image);
            const tokenUrl = await storeTokenUriMetadata(name, price, description, url)
            await createSale(tokenUrl, price);
            router.push("/");
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
        }
    };
    const storeImages = async function (fileImg) {

        if (fileImg) {

            try {
                const formData = new FormData();
                formData.append("file", fileImg);

                const metadata = JSON.stringify({
                    name: `${fileImg.name}`,
                });
                formData.append('pinataMetadata', metadata);

                const options = JSON.stringify({
                    cidVersion: 0,
                })
                formData.append('pinataOptions', options);
                try {
                    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                        maxBodyLength: "Infinity",
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                            'pinata_api_key': `${pinataApiKey}`,
                            'pinata_secret_api_key': `${pinataApiSecret}`,
                        }
                    });
                    const ImgHash = `ipfs://${res.data.IpfsHash}`;
                    
                    return ImgHash
                } catch (error) {
                    console.log(error);
                }
                //Take a look at your Pinata Pinned section, you will see a new file added to you list.   

            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }
    const storeTokenUriMetadata = async function (name, price, description, ImgHash) {
        try {
            var data = JSON.stringify({
                "name": name,
                "price": price,
                "description": description,
                "image": ImgHash
            });

            const resJSON = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data: data,
                headers: {
                    'pinata_api_key': `${pinataApiKey}`,
                    'pinata_secret_api_key': `${pinataApiSecret}`,
                },
            });
            console.log(resJSON.data)
            const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
            return tokenURI
        } catch (error) {
            console.log("JSON to IPFS: ")
            console.log(error);
        }

    }
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);
            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            // const contractMarketplace = contract;
            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(url, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            console.log(error);
        }
    };
    return (
        <NFTMarketplaceContext.Provider value={{connectingWithSmartContract,connectWallet,walletAddress,createNFT}}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})