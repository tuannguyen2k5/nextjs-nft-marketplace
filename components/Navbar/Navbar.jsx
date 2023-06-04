import React,{useState,useContext} from 'react'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import CustomButton from '../CustomButton/CustomButton'
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";
import { useRouter } from 'next/router'


export const discover =[
  { label: "Collection", url: "collections" },  
  { label: "Search", url: "search" },
  { label: "Author profile", url: "author" },
  { label: "NFT details", url: "NFT-details" },
  { label: "Account setting", url: "/" },
  { label: "Upload NFT", url: "uploadNFT" },
  { label: "Connect wallet", url: "/" }
]
export const helpCenter =[
  { label: "About", url: "/" },  
  { label: "Contact us", url: "/contactus" },
  { label: "Twitter", url: "/" }
]
const profile =[
  { label: "My profile", url: "/",icon: 'user'},  
  { label: "My items", url: "/author",icon: 'userimage'},  
  { label: "Edit profile", url: "/",icon: 'useredit'},  
  { label: "Help", url: "/",icon: 'helpcenter'},  
  { label: "About us", url: "/",icon: 'download'},  
]

const Navbar = () => {
  const {connectWallet,walletAddress} = useContext(NFTMarketplaceContext)
  const router = useRouter();
 
  return (
    <div className='w-full z-50 sticky h-20 flex items-center bg-white-400'>
      <div className='w-11/12 px-4 mx-auto my-0 grid grid-cols-2 gap-4' >
        <div className='flex justify-start items-center'>
          <Logo />
          <Search/>
        </div>
        <div className='flex justify-between items-center'>
          <DropDownMenu  
        title="Discover"
        links={discover} />
          <DropDownMenu  
        title="Help Center"
        links={helpCenter} />
          
          <DropDownMenu
          title="Profile"
          links={profile}/>
          {walletAddress == "" ? (
          <CustomButton title="Connect wallet" handleClick={() =>connectWallet()}/>):(
            <CustomButton title="Create" handleClick={() =>router.push('/uploadNFT')}/>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar