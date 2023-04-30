import React from "react";

import facebook from "./footer/icons8-facebook-50.png";
import instagram from "./footer/icons8-instagram-50.png";
import whatsapp from "./footer/icons8-whatsapp-50.png";

function Footer() {
  return (
    <div className="w-full flex flex-col md:flex-row px-10 py-5 mt-10">
      <div className="w-full md:w-1/2 flex">
        <img
          src="https://www.broadwaypizza.com.pk/assets/get_the_app.png"
          alt=""
          className="w-24"
        />
        <div className="md:mx-5">
          <h1 className="text-cyan-600 text-2xl sm:text-3xl font-bold">
            Get the App!
          </h1>
          <p className="font-light sm:w-3/4 md:w-2/3 text-[15px] my-2">
            App is where the fun is! It’s Easy, Fast and Convenient.
          </p>
          <div className="flex my-3 flex-col sm:flex-row">
            <img
              src="https://www.broadwaypizza.com.pk/assets/download-app-play-broadway.png"
              alt=""
              className="w-28"
            />
            <img
              src="https://www.broadwaypizza.com.pk/assets/download-app-store-broadway.png"
              alt=""
              className="w-28"
            />
          </div>
        </div>
      </div>
      <div className="border-t md:border-none w-full md:w-1/2 my-5 md:m-0 p-5 md:py-0 text-center md:text-start">
        <h1 className="text-cyan-600 text-3xl font-bold">Connect with us</h1>

        <div className="flex mt-3 mb-10 justify-center md:justify-start">
          <img src={facebook} alt="" className="w-8" />
          <img src={instagram} alt="" className="w-8 mx-2" />
          <img src={whatsapp} alt="" className="w-8" />
        </div>
        <p className="text-sm">
          Copyright © Broadway Pizza Pakistan. All rights reserved. <br />J & S
          CORPORATION
        </p>
      </div>
    </div>
  );
}

export default Footer;
