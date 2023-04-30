import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

function Home({ data }) {
  return (
    <>
      <div className="md:my-3">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          autoplay={true}
        >
          {data
            .filter((d) => {
              return d.category === "slider";
            })
            .map((d, i) => (
              <SwiperSlide key={i} className="md:p-3">
                <img
                  src={"https://broadway.onrender.com/" + d.img}
                  alt=""
                  className="md:rounded-xl w-full h-[30vh] sm:h-auto"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <Link
          to="/order"
          className="bg-yellow-500 p-2 rounded-full font-bold text-center block m-2 md:mx-5 md:my-0"
        >
          Order Now
        </Link>
      </div>
      <div className="flex w-full flex-wrap">
        <div className="w-full sm:w-1/2 shrink-0 md:p-10 p-4">
          <h1 className="text-cyan-600 text-4xl font-light my-3">
            About <b className="font-bold">Broadway Pizza</b>
          </h1>
          <p className="text-[14px]">
            An Award-Winning International Pizza Chain with 50+ outlets
            Nationwide in Pakistan.
          </p>
          <p className="text-[14px] my-3">
            Broadway’s magical flavors with the secrets in crust, toppings and
            the sauces cheers you up when you’re down. The Pizza, bigger in size
            with the perfect combination of scrumptious toppings along with
            cheese and the golden stuffed crust marks our endless performance.{" "}
            <b>Every Bite is a Performance!</b>
          </p>
          <div className="bg-gray-200 p-10 rounded-3xl">
            <h1 className="text-cyan-600 text-4xl font-light mb-5">
              Our Mission
            </h1>
            <p className="text-sm">
              We aim to serve the highest quality products and provide
              uncompromising heartfelt services to our valued customers across
              Pakistan.
            </p>
            <p className="text-sm my-1">
              <span>
                <img
                  src="https://www.broadwaypizza.com.pk/assets/check-green.png"
                  alt=""
                  className="w-10 inline-block"
                />
              </span>{" "}
              Quality Ingredients
            </p>
            <p className="text-sm my-1">
              <span>
                <img
                  src="https://www.broadwaypizza.com.pk/assets/check-green.png"
                  alt=""
                  className="w-10 inline-block"
                />
              </span>{" "}
              Friendly Service
            </p>
            <p className="text-sm my-1">
              <span>
                <img
                  src="https://www.broadwaypizza.com.pk/assets/check-green.png"
                  alt=""
                  className="w-10 inline-block"
                />
              </span>{" "}
              Customer Satisfaction
            </p>
          </div>
        </div>
        {data
          .filter((d) => {
            return d.category === "home";
          })
          .map((d) => (
            <div className="w-full sm:w-1/2 shrink-0 md:p-10 p-4 my-4">
              <img
                src={"https://broadway.onrender.com/" + d.img}
                alt=""
                className="w-full rounded-3xl sticky top-32"
              />
            </div>
          ))}
        <div className="w-full sm:w-1/2 shrink-0 md:p-10 p-4 flex flex-col justify-center">
          <h1 className="text-cyan-600 text-4xl font-light my-5">
            Our Locations
          </h1>
          <div className="md:w-3/4">
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Karachi
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Lahore
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Islamabad
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl  font-light">
              Rawalpindi
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Faislabad
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Sialkot
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Multan
            </button>
            <button className="py-3 px-5 bg-gray-100 m-2 rounded-3xl font-light">
              Hydrabad
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
