import React from 'react';
import Image from 'next/image';
import { discover, helpCenter } from '../Navbar/Navbar'
import Link from 'next/link'
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
} from "react-icons/ti";
import { RiSendPlaneFill } from 'react-icons/ri';

const Footer = () => {
    return (
        <div className="w-full relative">
            <div className="w-11/12 mx-auto my-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <h3>Subscribe</h3>
                    <div className="flex justify-between items-center mt-10">
                        <input className="w-11/12" type="email" name="email" id="email" placeholder='Enter your email' />
                        <RiSendPlaneFill className="cursor-pointer text-lg" />
                    </div>
                    <div className="py-8">
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    </div>
                </div>
                <div className="">
                    <Image src="" alt="footer logo" />
                    <div className="">
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
                    </div>
                    <div className="flex text-3xl">
                        <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
                            <TiSocialFacebook />
                        </a>
                        <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
                            <TiSocialLinkedin />
                        </a>
                        <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
                            <TiSocialTwitter />
                        </a>
                        <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
                            <TiSocialYoutube />
                        </a>
                        <a className="p-2 rounded-full transition-all duration-300 ease-in grid hover:bg-red-100" href="#">
                            <TiSocialInstagram />
                        </a>
                    </div>
                </div>
                <div className="">
                    <h3>Discover</h3>
                    {discover.map((el, i) => (

                        <div key={i + 1} className="px-4 py-2 pl-0 hover:bg-red-100">
                            <Link href={{ pathname: `${el.url}` }}>{el.label}</Link>
                        </div>
                    ))}
                </div>
                <div className="">
                    <h3>Help Center</h3>
                    {helpCenter.map((el, i) => (

                        <div key={i + 1} className="px-4 py-2 pl-0 hover:bg-red-100">
                            <Link href={{ pathname: `${el.url}` }}>{el.label}</Link>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Footer