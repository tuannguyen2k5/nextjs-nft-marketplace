import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { useRouter } from "next/router";
import { ethers } from 'ethers';
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

const pinataApiKey = process.env.pinataApiKey
const pinataApiSecret = process.env.pinataApiSecret
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

//---FETCHING SMART CONTRACT
const fetchContract = (signer) =>
    new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signer);

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract", error);
    }
};

export const NFTMarketplaceContext = createContext()
export const NFTMarketplaceProvider = (({ children }) => {
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [walletAddress, setWalletAddress] = useState('')
    const [provider, setProvider] = useState(null);
    const [connected, setConnected] = useState(false)
    const router = useRouter();

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setWalletAddress(accounts[0]);
                // console.log(accounts[0]);
            } else {
                setError("No Account Found");
                setOpenError(true);
            }
        } catch (error) {
            setError("Something wrong while connecting to wallet");
            setOpenError(true);
        }
    };

    useEffect(() => {
        checkIfWalletConnected()
        connectingWithSmartContract()
    }, []);


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
    useEffect(() => {
        connectWallet()
    }, [])
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
                    console.log(ImgHash)

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
        const body = {
            name: name,
            price: price,
            description: description,
            image: ImgHash
        };
        const options = {
            pinataMetadata: {
                name: name,
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        try {
            const resJSON = await pinata.pinJSONToIPFS(body, options)
            console.log(resJSON)
            const tokenURI = `ipfs://${resJSON.IpfsHash}`
            return tokenURI
        } catch (error) {
            console.log(error)
        }
        return null

    }
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);
            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            const contract = await connectingWithSmartContract();
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
    //--FETCHNFTS FUNCTION

    const fetchNFTs = async () => {
        try {
            if (walletAddress) {
                const contract = await connectingWithSmartContract();

                const data = await contract.fetchMarketItems();

                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);

                            // Fetch the data content from Pinata and log it to the console
                            let name, image, description

                            await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenURI.slice(7)}`, {
                                headers: {
                                    'Accept': 'text/plain'
                                }
                            }).then((response) => {
                                name = response.data.name
                                image = response.data.image
                                description = response.data.description
                                unformattedPrice = response.data.price
                                console.log(response.data);
                            }).catch((error) => {
                                console.error(error);
                            });
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                            };
                        }
                    )
                );

                console.log(items);
                return items;
            }
        } catch (error) {
            setError("Error while fetching NFTS");
            setOpenError(true);
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNFTs();
    }, []);
    return (
        <NFTMarketplaceContext.Provider value={{ connectingWithSmartContract, connectWallet, checkIfWalletConnected, walletAddress, createNFT, fetchNFTs }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})
