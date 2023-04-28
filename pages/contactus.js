import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

import { Container, CustomButton } from "../components/componentsindex";

const contactus = () => {
  return (
    <Container>
        <h1 className="text-center">Contact</h1>
        <div className="grid grid-cols-3 gap-20 items-center mb-40">
          <div className="col-span-1">
            <div className="">
              <h3>🗺 ADDRESS</h3>
              <p>
                Truong Dinh,Hoang Mai,Ha Noi,Viet Nam
              </p>
            </div>
            <div className="">
              <h3>💌 EMAIL</h3>
              <p>nc.example@example.com</p>
            </div>
            <div className="">
              <h3>☎ PHONE</h3>
              <p>000-123-456-7890</p>
            </div>
            <div >
              <h3>🌏 SOCIALS</h3>
              <div className="flex">
              <a className="text-lg p-2 rounded-full transition-all duration-300 ease-in hover:bg-red-100" href="#">
                <TiSocialFacebook />
              </a>
              <a className="text-lg p-2 rounded-full transition-all duration-300 ease-in hover:bg-red-100" href="#">
                <TiSocialLinkedin />
              </a>
              <a className="text-lg p-2 rounded-full transition-all duration-300 ease-in hover:bg-red-100" href="#">
                <TiSocialInstagram />
              </a>
              <a className="text-lg p-2 rounded-full transition-all duration-300 ease-in hover:bg-red-100" href="#">
                <TiSocialYoutube />
              </a>
              <a className="text-lg p-2 rounded-full transition-all duration-300 ease-in hover:bg-red-100" href="#">
                <TiSocialTwitter />
              </a>
              </div>
              
            </div>
          </div>
          <div className="col-span-2">
            <form>
              <div className="mt-8">
                <label className="block w-full ml-4 font-bold text-xl" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border p-4 rounded-2xl bg-transparent mt-2"
                />
              </div>
              <div>
                <label className="block w-full ml-4 font-bold text-xl" htmlFor="email">Email</label>
                <div className="w-full border rounded-2xl items-center flex gap-4 overflow-hidden">
                  <div className="text-4xl px-2 py-4 cursor-pointer">
                    <HiOutlineMail />
                  </div>
                  <input className="w-full border p-4 rounded-2xl bg-transparent mt-2" type="text" placeholder="Email*" />
                </div>
              </div>
              <div>
                <label className="block w-full ml-4 font-bold text-xl" htmlFor="description">Message</label>
                <textarea
                  className="bg-transparent p-4 rounded-2xl w-full h-full"
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="something about yourself in few words"
                ></textarea>
              </div>
              <CustomButton
                title="Send Message"
              />
            </form>
          </div>
        </div>
    </Container>
  );
};

export default contactus;